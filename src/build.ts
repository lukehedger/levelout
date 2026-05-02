import { cp, readdir, rm } from "node:fs/promises";
import { join, relative } from "node:path";
import { POSTS_PER_PAGE } from "./config.ts";
import { renderRss, renderSitemap } from "./lib/feeds.ts";
import { render } from "./lib/html.ts";
import { paginate } from "./lib/paginate.ts";
import {
	loadPosts,
	type Post,
	postsByTag,
	sortByDate,
	tagsWithCount,
	uniqueTags,
} from "./lib/posts.ts";
import { writeFile } from "./lib/writeFile.ts";
import { renderBook } from "./templates/book.ts";
import { renderHome } from "./templates/home.ts";
import { renderNotFound } from "./templates/notFound.ts";
import { renderPost } from "./templates/post.ts";
import { renderPostsIndex } from "./templates/postsIndex.ts";
import { renderReading } from "./templates/reading.ts";
import { renderTagPage } from "./templates/tagPage.ts";
import { renderTagsIndex } from "./templates/tagsIndex.ts";

const DIST = "dist";
const PUBLIC_DIR = "public";
const CONTENT_DIR = "content/posts";
const STYLES_DIR = "src/styles";
const CLIENT_ENTRY = "src/client/main.ts";

async function cleanDist(): Promise<void> {
	await rm(DIST, { recursive: true, force: true });
}

async function copyPublic(): Promise<void> {
	await cp(PUBLIC_DIR, DIST, { recursive: true });
}

async function buildClient(): Promise<void> {
	const result = await Bun.build({
		entrypoints: [CLIENT_ENTRY],
		outdir: `${DIST}/assets`,
		target: "browser",
		minify: true,
		naming: "main.[ext]",
		sourcemap: "linked",
	});
	if (!result.success) {
		for (const log of result.logs) console.error(log);
		throw new Error("client bundle failed");
	}
}

async function buildStyles(): Promise<void> {
	const main = await Bun.file(join(STYLES_DIR, "main.css")).text();
	const shiki = await Bun.file(join(STYLES_DIR, "shiki.css")).text();
	await writeFile(DIST, "assets/main.css", `${main}\n${shiki}\n`);
}

type PageWrite = { route: string; html: string };

function pathForRoute(route: string): string {
	if (route === "/") return "index.html";
	if (route.endsWith(".html")) return route.slice(1);
	return `${route.slice(1).replace(/\/$/, "")}/index.html`;
}

async function writePages(posts: Post[]): Promise<string[]> {
	const writes: PageWrite[] = [];

	writes.push({ route: "/", html: render(renderHome(posts)) });
	writes.push({ route: "/book/", html: render(renderBook()) });
	writes.push({ route: "/reading/", html: render(renderReading()) });
	writes.push({ route: "/404.html", html: render(renderNotFound()) });

	const sorted = sortByDate(posts);
	const allTags = uniqueTags(posts);
	const postsPages = paginate(sorted, POSTS_PER_PAGE, "/posts/");
	for (const page of postsPages) {
		writes.push({ route: page.url, html: render(renderPostsIndex(page, allTags)) });
	}

	for (const post of posts) {
		writes.push({ route: `/posts/${post.slug}/`, html: render(renderPost(post)) });
	}

	writes.push({ route: "/tags/", html: render(renderTagsIndex(tagsWithCount(posts))) });
	for (const tag of allTags) {
		const tagPosts = sortByDate(postsByTag(posts, tag));
		const pages = paginate(tagPosts, POSTS_PER_PAGE, `/tags/${tag}/`);
		for (const page of pages) {
			writes.push({ route: page.url, html: render(renderTagPage(tag, page)) });
		}
	}

	for (const w of writes) {
		await writeFile(DIST, pathForRoute(w.route), w.html);
	}

	return writes.map((w) => w.route).filter((r) => !r.endsWith(".html"));
}

async function writeFeeds(posts: Post[], routes: string[]): Promise<void> {
	const sorted = sortByDate(posts);
	await writeFile(DIST, "rss.xml", renderRss(sorted));
	await writeFile(DIST, "sitemap.xml", renderSitemap(routes));
}

async function writeSearchIndex(posts: Post[]): Promise<void> {
	const docs = sortByDate(posts).map((p) => ({
		slug: p.slug,
		title: p.frontmatter.title,
		description: p.frontmatter.description,
		tags: p.frontmatter.tags,
		date: p.frontmatter.publishDate.toISOString(),
		body: p.plainText,
	}));
	await writeFile(DIST, "search.json", JSON.stringify(docs));
}

async function countFiles(dir: string): Promise<number> {
	let count = 0;
	async function walk(d: string): Promise<void> {
		const entries = await readdir(d, { withFileTypes: true });
		for (const e of entries) {
			const full = join(d, e.name);
			if (e.isDirectory()) await walk(full);
			else count += 1;
		}
	}
	await walk(dir);
	return count;
}

export async function build(): Promise<void> {
	const start = performance.now();

	await cleanDist();
	console.log("build: cleaned dist");

	await copyPublic();
	console.log("build: copied public/");

	const posts = await loadPosts(CONTENT_DIR);
	console.log(`build: loaded ${posts.length} posts`);

	await buildClient();
	console.log("build: bundled client JS");

	await buildStyles();
	console.log("build: wrote CSS");

	const routes = await writePages(posts);
	console.log(`build: wrote ${routes.length} pages`);

	await writeFeeds(posts, routes);
	await writeSearchIndex(posts);
	console.log("build: wrote feeds + search index");

	const files = await countFiles(DIST);
	const ms = Math.round(performance.now() - start);
	console.log(`build: ${files} files in dist/, ${ms}ms`);
}

if (import.meta.main) {
	await build();
}

export { relative };
