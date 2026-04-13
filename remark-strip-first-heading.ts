import type { Root } from 'mdast';

/** Remark plugin that removes the first H1 heading if it is the first node in the document. */
export function remarkStripFirstHeading() {
  return (tree: Root) => {
    if (
      tree.children.length > 0 &&
      tree.children[0].type === 'heading' &&
      tree.children[0].depth === 1
    ) {
      tree.children.splice(0, 1);
    }
  };
}
