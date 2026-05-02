import { watch } from "node:fs/promises";
import { extname, join } from "node:path";
import { build } from "./build.ts";

const DIST = "dist";
const PORT = Number.parseInt(process.env.PORT ?? "3000", 10);

const MIME: Record<string, string> = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".map": "application/json; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".xml": "application/xml; charset=utf-8",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".ico": "image/x-icon",
	".svg": "image/svg+xml",
	".webmanifest": "application/manifest+json",
	".txt": "text/plain; charset=utf-8",
};

function contentType(path: string): string {
	return MIME[extname(path)] ?? "application/octet-stream";
}

async function serveFile(path: string): Promise<Response | null> {
	const file = Bun.file(path);
	if (!(await file.exists())) return null;
	return new Response(file, { headers: { "content-type": contentType(path) } });
}

async function handle(req: Request): Promise<Response> {
	const url = new URL(req.url);
	let path = decodeURIComponent(url.pathname);
	if (path.endsWith("/")) path += "index.html";
	const direct = await serveFile(join(DIST, path));
	if (direct) return direct;
	if (!extname(path)) {
		const indexed = await serveFile(join(DIST, path, "index.html"));
		if (indexed) return indexed;
	}
	const notFound = await serveFile(join(DIST, "404.html"));
	if (notFound) return new Response(await notFound.text(), { status: 404, headers: notFound.headers });
	return new Response("Not found", { status: 404 });
}

let rebuilding: Promise<void> | null = null;
async function rebuild(reason: string): Promise<void> {
	if (rebuilding) return rebuilding;
	console.log(`\ndev: rebuild (${reason})`);
	rebuilding = build()
		.catch((err) => console.error("dev: build failed:", err))
		.finally(() => {
			rebuilding = null;
		});
	return rebuilding;
}

async function watchDir(dir: string): Promise<void> {
	const watcher = watch(dir, { recursive: true });
	for await (const event of watcher) {
		if (!event.filename) continue;
		if (event.filename.includes(".DS_Store")) continue;
		await rebuild(`${dir}/${event.filename}`);
	}
}

async function main(): Promise<void> {
	await build();

	const server = Bun.serve({ port: PORT, fetch: handle });
	console.log(`dev: serving http://localhost:${server.port}`);
	console.log("dev: watching src/, content/, public/");

	void watchDir("src");
	void watchDir("content");
	void watchDir("public");
}

if (import.meta.main) {
	await main();
}
