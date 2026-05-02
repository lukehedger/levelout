import { dateTag } from "~/lib/date.ts";
import { html, type Html } from "~/lib/html.ts";
import type { Post } from "~/lib/posts.ts";

export function renderPostPreview(post: Post, withDesc: boolean): Html {
	const date = post.frontmatter.updatedDate ?? post.frontmatter.publishDate;
	return html`
		${dateTag(date, undefined, "post-preview-date")}
		<h2 class="post-preview-title">
			${post.frontmatter.draft ? html`<span class="draft-tag">(Draft) </span>` : null}
			<a class="cactus-link" href="/posts/${post.slug}/">${post.frontmatter.title}</a>
		</h2>
		${withDesc ? html`<q class="post-preview-desc">${post.frontmatter.description}</q>` : null}
	`;
}
