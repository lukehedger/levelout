import { html, type Html } from "~/lib/html.ts";
import { renderLayout } from "./layout.ts";

export function renderTagsIndex(tags: Array<[string, number]>): Html {
	const content = html`
		<h1 class="title">Tags</h1>
		<ul class="tag-pill-list">
			${tags.map(
				([tag, count]) => html`<li>
					<a
						aria-label="View all posts with the tag: ${tag}"
						class="tag-pill"
						href="/tags/${tag}/"
						title="${count} post${count > 1 ? "s" : ""}"
						>#${tag}</a
					>
				</li>`,
			)}
		</ul>
	`;

	return renderLayout({
		title: "All Tags",
		description: "A list of all the topics I've written about in my posts",
		path: "/tags/",
		content,
	});
}
