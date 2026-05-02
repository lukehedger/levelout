import { html, type Html } from "~/lib/html.ts";
import type { PaginatedPage } from "~/lib/paginate.ts";
import type { Post } from "~/lib/posts.ts";
import { renderPaginator } from "./components/paginator.ts";
import { renderPostPreview } from "./components/postPreview.ts";
import { renderLayout } from "./layout.ts";

const TAG_ICON = html`<svg
	aria-hidden="true"
	class="icon-tag"
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="1.5"
	viewBox="0 0 24 24"
>
	<path d="M0 0h24v24H0z" fill="none" stroke="none" />
	<path
		d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l6.116 6.116a2.025 2.025 0 0 0 2.864 0l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-6.117 -6.116a2.025 2.025 0 0 0 -1.431 -.593z"
	/>
	<path d="M17.573 18.407l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-7.117 -7.116" />
	<path d="M6 9h-.01" />
</svg>`;

export function renderPostsIndex(
	page: PaginatedPage<Post>,
	allTags: string[],
): Html {
	const content = html`
		<h1 class="title">Posts</h1>
		<div class="posts-layout">
			<section aria-label="Blog post list">
				<ul class="post-list post-list-with-desc">
					${page.items.map(
						(p) => html`<li class="post-list-item">${renderPostPreview(p, true)}</li>`,
					)}
				</ul>
				${renderPaginator(page.prev, page.next)}
			</section>
			${allTags.length > 0
				? html`<aside class="tags-aside">
						<h2>${TAG_ICON} Tags</h2>
						<ul class="tag-pill-list">
							${allTags.map(
								(tag) => html`<li>
									<a
										aria-label="View all posts with the tag: ${tag}"
										class="tag-pill"
										href="/tags/${tag}/"
										>${tag}</a
									>
								</li>`,
							)}
						</ul>
						<span class="view-all"><a href="/tags/">View all →</a></span>
					</aside>`
				: null}
		</div>
	`;

	return renderLayout({
		title: "Posts",
		description: "Read my collection of posts and the things that interest me",
		path: page.url,
		content,
	});
}
