import { html, type Html } from "~/lib/html.ts";
import type { PaginatedPage } from "~/lib/paginate.ts";
import type { Post } from "~/lib/posts.ts";
import { renderPaginator } from "./components/paginator.ts";
import { renderPostPreview } from "./components/postPreview.ts";
import { renderLayout } from "./layout.ts";

export function renderTagPage(tag: string, page: PaginatedPage<Post>): Html {
	const content = html`
		<h1 class="title">Posts tagged with <q>${tag}</q></h1>
		<p>
			<a class="cactus-link" href="/tags/">← Back to all tags</a>
		</p>
		<ul class="post-list post-list-with-desc">
			${page.items.map(
				(p) => html`<li class="post-list-item">${renderPostPreview(p, true)}</li>`,
			)}
		</ul>
		${renderPaginator(page.prev, page.next)}
	`;

	return renderLayout({
		title: `Posts tagged "${tag}"`,
		description: `All posts tagged "${tag}"`,
		path: page.url,
		content,
	});
}
