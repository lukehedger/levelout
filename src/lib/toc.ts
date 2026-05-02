import type { Heading } from "./markdown.ts";

export type TocItem = {
	depth: number;
	slug: string;
	text: string;
	children: TocItem[];
};

// Build a nested TOC tree from a flat list of headings. Skips depth-1 (h1
// is the post title, rendered separately). Depth drops that skip a level
// (h2 -> h4) attach to the most recent shallower heading.
export function buildToc(headings: Heading[]): TocItem[] {
	const root: TocItem[] = [];
	const stack: TocItem[] = [];
	for (const { depth, slug, text } of headings) {
		if (depth < 2) continue;
		const item: TocItem = { depth, slug, text, children: [] };
		while (stack.length > 0) {
			const top = stack[stack.length - 1];
			if (!top || top.depth < depth) break;
			stack.pop();
		}
		const parent = stack[stack.length - 1];
		if (parent) parent.children.push(item);
		else root.push(item);
		stack.push(item);
	}
	return root;
}
