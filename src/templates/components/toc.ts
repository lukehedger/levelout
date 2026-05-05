import { html, type Html } from "~/lib/html.ts";
import type { TocItem } from "~/lib/toc.ts";

function renderItem(item: TocItem): Html {
	return html`
		<li>
			<a href="#${item.slug}">${item.text}</a>
			${item.children.length > 0
				? html`<ul>${item.children.map(renderItem)}</ul>`
				: null}
		</li>
	`;
}

export function renderToc(items: TocItem[]): Html {
	if (items.length === 0) return html``;
	return html`
		<aside class="toc">
			<h2>Table of Contents</h2>
			<ul>${items.map(renderItem)}</ul>
		</aside>
	`;
}
