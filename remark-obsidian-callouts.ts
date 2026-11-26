/*
 * Adapted from the callout transformer of Quartz
 * (https://github.com/jackyzha0/quartz, quartz/plugins/transformers/ofm.ts).
 *
 * MIT License
 *
 * Copyright (c) 2021 jackyzha0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { Blockquote, Paragraph, PhrasingContent, Root } from 'mdast';
import { visit } from 'unist-util-visit';

/** Obsidian's callout type aliases, mapped to the type whose colour and icon they share. */
const CALLOUT_TYPES: Record<string, string> = {
  note: 'note',
  abstract: 'abstract',
  summary: 'abstract',
  tldr: 'abstract',
  info: 'info',
  todo: 'todo',
  tip: 'tip',
  hint: 'tip',
  important: 'tip',
  success: 'success',
  check: 'success',
  done: 'success',
  question: 'question',
  help: 'question',
  faq: 'question',
  warning: 'warning',
  attention: 'warning',
  caution: 'warning',
  failure: 'failure',
  missing: 'failure',
  fail: 'failure',
  danger: 'danger',
  error: 'danger',
  bug: 'bug',
  example: 'example',
  quote: 'quote',
  cite: 'quote',
};

/** `[!type|metadata]` followed by an optional fold sign: `+` folded open, `-` folded closed. */
const CALLOUT_REGEX = /^\[!([\w-]+)(?:\|([^\]]*))?\]([+-]?)[ \t]*/;

const CALLOUT_MARK = 'obsidianCallout';

/**
 * Remark plugin that renders Obsidian callouts (`> [!type] title`) as styled callout blocks.
 *
 * A plain callout becomes `<div class="callout">`; a foldable one (`[!type]+` or `[!type]-`) becomes
 * `<details class="callout">`, open for `+` and closed for `-`, so it folds without any script.
 * The title keeps its inline markdown; with no title, the type name is the title, as in Obsidian.
 */
export function remarkObsidianCallouts() {
  return (tree: Root) => {
    visit(tree, 'blockquote', (node: Blockquote) => {
      if (node.data && CALLOUT_MARK in node.data) {
        return;
      }

      const [firstChild, ...restChildren] = node.children;
      if (firstChild?.type !== 'paragraph') {
        return;
      }

      const head = firstChild.children[0];
      if (head?.type !== 'text') {
        return;
      }

      const match = CALLOUT_REGEX.exec(head.value);
      if (!match) {
        return;
      }

      const [directive, typeName, metadata, foldSign] = match;
      const type = CALLOUT_TYPES[typeName.toLowerCase()] ?? typeName.toLowerCase();
      const isFoldable = foldSign === '+' || foldSign === '-';

      const { title, body } = splitTitle([
        { type: 'text', value: head.value.slice(directive.length) },
        ...firstChild.children.slice(1),
      ]);
      if (title.length === 0) {
        title.push({ type: 'text', value: defaultTitle(typeName) });
      }

      const titleNode: Paragraph = {
        type: 'paragraph',
        data: {
          hName: isFoldable ? 'summary' : 'div',
          hProperties: { className: ['callout-title'] },
        },
        children: [
          iconNode('callout-icon'),
          {
            type: 'emphasis',
            data: { hName: 'span', hProperties: { className: ['callout-title-inner'] } },
            children: title,
          },
          ...(isFoldable ? [iconNode('callout-fold')] : []),
        ],
      };

      const content: Blockquote['children'] = [];
      if (body.length > 0) {
        content.push({ type: 'paragraph', children: body });
      }
      content.push(...restChildren);

      const children: Blockquote['children'] = [titleNode];
      if (content.length > 0) {
        children.push({
          type: 'blockquote',
          data: {
            [CALLOUT_MARK]: true,
            hName: 'div',
            hProperties: { className: ['callout-content'] },
          },
          children: content,
        });
      }

      node.children = children;
      node.data = {
        ...node.data,
        [CALLOUT_MARK]: true,
        hName: isFoldable ? 'details' : 'div',
        hProperties: {
          className: ['callout'],
          dataCallout: type,
          ...(metadata ? { dataCalloutMetadata: metadata.trim() } : {}),
          ...(isFoldable ? { dataCalloutFold: foldSign } : {}),
          ...(foldSign === '+' ? { open: true } : {}),
        },
      };
    });
  };
}

/** Splits the inline content after the `[!type]` directive at its first line break: the first line is the title, the rest opens the body. */
function splitTitle(inlines: PhrasingContent[]): { title: PhrasingContent[]; body: PhrasingContent[] } {
  const title: PhrasingContent[] = [];
  const body: PhrasingContent[] = [];
  let isInTitle = true;

  for (const inline of inlines) {
    if (!isInTitle) {
      body.push(inline);
      continue;
    }

    if (inline.type === 'break') {
      isInTitle = false;
      continue;
    }

    if (inline.type === 'text') {
      const newlineIndex = inline.value.indexOf('\n');
      if (newlineIndex !== -1) {
        title.push({ type: 'text', value: inline.value.slice(0, newlineIndex) });
        const rest = inline.value.slice(newlineIndex + 1);
        if (rest) {
          body.push({ type: 'text', value: rest });
        }
        isInTitle = false;
        continue;
      }
    }

    title.push(inline);
  }

  trimEdges(title);
  return { title, body };
}

/** Trims whitespace off the outer text nodes and drops the ones left empty. */
function trimEdges(inlines: PhrasingContent[]): void {
  const first = inlines[0];
  if (first?.type === 'text') {
    first.value = first.value.trimStart();
  }

  const last = inlines.at(-1);
  if (last?.type === 'text') {
    last.value = last.value.trimEnd();
  }

  for (let i = inlines.length - 1; i >= 0; i--) {
    const inline = inlines[i];
    if (inline.type === 'text' && inline.value === '') {
      inlines.splice(i, 1);
    }
  }
}

/** Obsidian's default title: the type as written, capitalised, with hyphens as spaces. */
function defaultTitle(typeName: string): string {
  const words = typeName.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** An empty `<span>` the stylesheet paints an icon into. */
function iconNode(className: string): PhrasingContent {
  return {
    type: 'emphasis',
    data: { hName: 'span', hProperties: { className: [className], ariaHidden: 'true' } },
    children: [],
  };
}
