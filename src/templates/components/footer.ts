import { menu, site } from "~/config.ts";
import { html, type Html } from "~/lib/html.ts";

export function renderFooter(): Html {
	const year = new Date().getFullYear();
	return html`
		<footer class="site-footer">
			<div>
				&copy; ${site.author} ${year}. <span>🚀 ${site.title}</span>
			</div>
			<nav aria-label="More on this site" class="site-footer-nav">
				${menu.map(
					(link) => html`<a href="${link.path}">${link.title}</a>`,
				)}
			</nav>
		</footer>
	`;
}
