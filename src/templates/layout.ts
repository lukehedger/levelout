import { site } from "~/config.ts";
import { attrs, html, type Html, raw } from "~/lib/html.ts";
import { renderFooter } from "./components/footer.ts";
import { renderHeader } from "./components/header.ts";
import { THEME_INLINE_SCRIPT } from "./components/themeInlineScript.ts";

export type LayoutOpts = {
	title: string;
	description?: string;
	ogImage?: string;
	articleDate?: string;
	path: string;
	content: Html;
};

export function renderLayout(opts: LayoutOpts): Html {
	const {
		title,
		description = site.description,
		ogImage = "/social-card.png",
		articleDate,
		path,
		content,
	} = opts;
	const fullTitle = `${title} • ${site.title}`;
	const canonical = `${site.url}${path}`;
	const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${site.url}${ogImage}`;

	return html`<!doctype html>
<html lang="${site.lang}">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
		<title>${fullTitle}</title>
		<link rel="icon" href="/favicon.ico" sizes="any" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		<link rel="manifest" href="/manifest.webmanifest" />
		<link rel="canonical" href="${canonical}" />
		<meta name="title" content="${fullTitle}" />
		<meta name="description" content="${description}" />
		<meta name="author" content="${site.author}" />
		<meta name="theme-color" content="" />
		<meta property="og:type" content="${articleDate ? "article" : "website"}" />
		<meta property="og:title" content="${title}" />
		<meta property="og:description" content="${description}" />
		<meta property="og:url" content="${canonical}" />
		<meta property="og:site_name" content="${site.title}" />
		<meta property="og:locale" content="${site.ogLocale}" />
		<meta property="og:image" content="${ogImageUrl}" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		${articleDate
			? html`<meta ${attrs({ property: "article:author", content: site.author })} />
				<meta ${attrs({ property: "article:published_time", content: articleDate })} />`
			: null}
		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content="${canonical}" />
		<meta property="twitter:title" content="${title}" />
		<meta property="twitter:description" content="${description}" />
		<meta property="twitter:image" content="${ogImageUrl}" />
		<link rel="sitemap" href="/sitemap.xml" />
		<link rel="alternate" type="application/rss+xml" title="${site.title}" href="/rss.xml" />
		<script>${raw(THEME_INLINE_SCRIPT)}</script>
		<link rel="stylesheet" href="/assets/main.css" />
		<script defer src="/assets/main.js"></script>
	</head>
	<body>
		<a class="skip-link sr-only" href="#main">Skip to content</a>
		${renderHeader(path)}
		<main id="main">${content}</main>
		${renderFooter()}
	</body>
</html>
`;
}
