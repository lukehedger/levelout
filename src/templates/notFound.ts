import { html, type Html } from "~/lib/html.ts";
import { renderLayout } from "./layout.ts";

export function renderNotFound(): Html {
	const content = html`
		<h1 class="title">404 — Oops something went wrong</h1>
		<p>Please use the navigation to find your way back.</p>
	`;

	return renderLayout({
		title: "Oops! You found a missing page!",
		description: "Oops! It looks like this page is lost in space!",
		path: "/404/",
		content,
	});
}
