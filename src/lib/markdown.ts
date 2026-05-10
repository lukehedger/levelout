import { Marked, type Tokens } from "marked";
import readingTime from "reading-time";
import { createHighlighter, type Highlighter } from "shiki";
import { site } from "~/config.ts";

export type Heading = { depth: number; slug: string; text: string };

export type Rendered = {
	html: string;
	headings: Heading[];
	readingMinutes: string;
	plainText: string;
};

const SHIKI_LANGS = [
	"typescript",
	"ts",
	"javascript",
	"js",
	"tsx",
	"jsx",
	"bash",
	"shell",
	"sh",
	"json",
	"markdown",
	"md",
	"html",
	"css",
	"python",
	"py",
	"yaml",
	"yml",
	"toml",
	"go",
	"rust",
	"rs",
	"diff",
	"sql",
] as const;

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ["dracula", "github-light"],
			langs: [...SHIKI_LANGS],
		});
	}
	return highlighterPromise;
}

export function slugify(s: string): string {
	return s
		.toLowerCase()
		.trim()
		.replace(/&/g, " and ")
		.replace(/[‘’“”]/g, "")
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

function escapeAttr(s: string): string {
	return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

const siteHost = new URL(site.url).host;

function isExternal(href: string): boolean {
	if (!/^https?:\/\//i.test(href)) return false;
	try {
		return new URL(href).host !== siteHost;
	} catch {
		return false;
	}
}

function ensureUniqueSlug(base: string, used: Map<string, number>): string {
	const count = used.get(base) ?? 0;
	used.set(base, count + 1);
	return count === 0 ? base : `${base}-${count}`;
}

export async function renderMarkdown(md: string): Promise<Rendered> {
	const highlighter = await getHighlighter();
	const headings: Heading[] = [];
	const usedSlugs = new Map<string, number>();

	const m = new Marked({
		gfm: true,
		renderer: {
			heading({ tokens, depth }: Tokens.Heading): string {
				const text = this.parser.parseInline(tokens, this.parser.textRenderer);
				const slug = ensureUniqueSlug(slugify(text), usedSlugs);
				headings.push({ depth, slug, text });
				const inner = this.parser.parseInline(tokens);
				return `<h${depth} id="${slug}"><a class="heading-anchor" href="#${slug}">${inner}</a></h${depth}>\n`;
			},
			code({ text, lang }: Tokens.Code): string {
				const raw = lang ?? "text";
				const resolved = (SHIKI_LANGS as readonly string[]).includes(raw) ? raw : "text";
				return highlighter.codeToHtml(text, {
					lang: resolved,
					themes: { light: "github-light", dark: "dracula" },
					defaultColor: false,
				});
			},
			link({ href, title, tokens }: Tokens.Link): string {
				const inner = this.parser.parseInline(tokens);
				const rel = isExternal(href) ? ' target="_blank" rel="nofollow noopener noreferrer"' : "";
				const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
				return `<a href="${escapeAttr(href)}"${titleAttr}${rel}>${inner}</a>`;
			},
			paragraph({ tokens }: Tokens.Paragraph): string {
				if (tokens.length === 1 && tokens[0]?.type === "image") {
					return `${this.parser.parseInline(tokens)}\n`;
				}
				return `<p>${this.parser.parseInline(tokens)}</p>\n`;
			},
		},
	});

	const html = (await m.parse(md)) as string;
	const { text: readingMinutes } = readingTime(md);
	const plainText = toPlainText(md);

	return { html, headings, readingMinutes, plainText };
}

function toPlainText(md: string): string {
	return md
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]*`/g, " ")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/[#>*_~\-]+/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}
