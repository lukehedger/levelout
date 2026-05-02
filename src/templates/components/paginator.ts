import { html, type Html } from "~/lib/html.ts";

export function renderPaginator(prev?: string, next?: string): Html {
	if (!prev && !next) return html``;
	return html`
		<nav class="paginator" aria-label="Pagination">
			${prev ? html`<a class="paginator-prev" href="${prev}">← Previous</a>` : null}
			${next ? html`<a class="paginator-next" href="${next}">Next →</a>` : null}
		</nav>
	`;
}
