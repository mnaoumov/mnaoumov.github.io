import type { Root } from 'hast';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

/** Rehype plugin that generates heading IDs matching Obsidian's format (preserves dots, spaces become spaces in the ID). */
export function rehypeObsidianHeadings() {
	return (tree: Root) => {
		visit(tree, 'element', (node) => {
			if (/^h[1-6]$/.test(node.tagName)) {
				const text = toString(node);
				node.properties.id = text;
			}
		});
	};
}
