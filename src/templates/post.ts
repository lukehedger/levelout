import { html, raw, type Html } from "~/lib/html.ts";
import type { Post } from "~/lib/posts.ts";
import { buildToc } from "~/lib/toc.ts";
import { renderHero } from "./components/hero.ts";
import { renderToc } from "./components/toc.ts";
import { renderLayout } from "./layout.ts";

export function renderPost(post: Post): Html {
	const toc = buildToc(post.headings);
	const articleDate = (
		post.frontmatter.updatedDate ?? post.frontmatter.publishDate
	).toISOString();

	const content = html`
		<div class="post-container">
			${renderToc(toc)}
			<article class="post-article">
				<div id="blog-hero">${renderHero(post)}</div>
				<div class="prose">${raw(post.html)}</div>
			</article>
		</div>
		<button
			aria-label="Back to Top"
			class="back-to-top"
			data-show="false"
			id="to-top-btn"
			type="button"
		>
			<svg
				aria-hidden="true"
				fill="none"
				focusable="false"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path d="M4.5 15.75l7.5-7.5 7.5 7.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	`;

	return renderLayout({
		title: post.frontmatter.title,
		description: post.frontmatter.description,
		articleDate,
		path: `/posts/${post.slug}/`,
		content,
	});
}
