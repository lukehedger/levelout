import { experiments, intro, POSTS_PER_PAGE, talks } from "~/config.ts";
import { html, type Html, raw } from "~/lib/html.ts";
import { type Post, sortByDate } from "~/lib/posts.ts";
import { renderPostPreview } from "./components/postPreview.ts";
import { renderSocialList } from "./components/socialList.ts";
import { renderLayout } from "./layout.ts";

export function renderHome(posts: Post[]): Html {
	const recent = sortByDate(posts).slice(0, POSTS_PER_PAGE);
	const content = html`
		<section id="hello">
			<h1 class="title">${intro.heading}</h1>
			${intro.paragraphs.map((p) => html`<p>${raw(p)}</p>`)}
			${renderSocialList()}
		</section>

		<section aria-label="Blog post list" class="section" id="posts">
			<h2 class="section-title">Posts</h2>
			<ul class="post-list">
				${recent.map(
					(p) => html`<li class="post-list-item">${renderPostPreview(p, false)}</li>`,
				)}
			</ul>
		</section>

		<section aria-label="Experiments list" class="section" id="experiments">
			<h2 class="section-title">Experiments</h2>
			<dl class="link-list">
				${experiments.map(
					(e) => html`
						<div class="link-list-item">
							<dt>
								<a class="cactus-link" href="${e.href}" rel="noopener noreferrer" target="_blank">${e.title}</a>:
							</dt>
							<dd>${e.desc}</dd>
						</div>
					`,
				)}
			</dl>
		</section>

		<section class="section" id="talks">
			<h2 class="section-title">Talks</h2>
			<dl class="link-list">
				${talks.map(
					(t) => html`
						<div class="link-list-item">
							<dt>
								<a class="cactus-link" href="${t.href}" rel="noopener noreferrer" target="_blank">${t.title}</a>:
							</dt>
							<dd>${t.desc}</dd>
						</div>
					`,
				)}
			</dl>
		</section>
	`;

	return renderLayout({ title: "Home", path: "/", content });
}
