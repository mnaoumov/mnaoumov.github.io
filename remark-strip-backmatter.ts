import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

/** Remark plugin that removes everything after an Obsidian comment `%% End of blog post %%` from the rendered output. */
export function remarkStripBackmatter() {
  return (tree: Root) => {
    let backmatterIndex = -1;

    visit(tree, 'paragraph', (node, index) => {
      if (
        backmatterIndex === -1 &&
        index !== undefined &&
        node.children.length === 1 &&
        node.children[0].type === 'text' &&
        node.children[0].value.trim() === '%% PUBLISH_END %%'
      ) {
        backmatterIndex = index;
      }
    });

    if (backmatterIndex !== -1) {
      tree.children.splice(backmatterIndex);
    }
  };
}
