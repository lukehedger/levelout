import { site } from "~/config.ts";
import { html, type Html } from "./html.ts";

export function formatDate(
	date: Date,
	options: Intl.DateTimeFormatOptions = site.dateOptions,
): string {
	return date.toLocaleDateString(site.dateLocale, options);
}

export function dateTag(
	date: Date,
	options: Intl.DateTimeFormatOptions = site.dateOptions,
	className?: string,
): Html {
	const iso = date.toISOString();
	const formatted = formatDate(date, options);
	return className
		? html`<time class="${className}" datetime="${iso}">${formatted}</time>`
		: html`<time datetime="${iso}">${formatted}</time>`;
}

export function toRFC822(date: Date): string {
	return date.toUTCString();
}
