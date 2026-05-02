import { social } from "~/config.ts";
import { html, type Html, raw } from "~/lib/html.ts";

const ICONS: Record<"bluesky" | "github", string> = {
	bluesky: `<svg aria-hidden="true" class="social-icon" focusable="false" viewBox="0 0 24 24"><path fill="currentColor" d="M13 21h-2V6L9.03 3.97L10 3l2 2l2-2l1 1l-2 2zM7 6a5.002 5.002 0 0 0-3 9v2c0 2.21 1.79 4 4 4c.72 0 1.39-.19 1.97-.5l.03-.04V7c-.84-.63-1.87-1-3-1m-.5 6.5L5 11l1.5-1.5L8 11zM22 11c0-2.76-2.24-5-5-5c-1.12 0-2.15.37-3 1v13.46c.59.35 1.27.54 2 .54c2.21 0 4-1.79 4-4v-2c1.21-.91 2-2.36 2-4m-4.5 1.5L16 11l1.5-1.5L19 11z"/></svg>`,
	github: `<svg aria-hidden="true" class="social-icon" focusable="false" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>`,
};

export function renderSocialList(): Html {
	return html`
		<div class="social-list">
			<p>Find me on</p>
			<ul>
				${social.map(
					(s) => html`
						<li>
							<a href="${s.href}" rel="noopener noreferrer" target="_blank">
								${raw(ICONS[s.icon])}
								<span class="sr-only">${s.name}</span>
							</a>
						</li>
					`,
				)}
			</ul>
		</div>
	`;
}
