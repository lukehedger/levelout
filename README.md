# lukehedger.dev

Hand-rolled static site built with Bun and TypeScript. No framework, no Tailwind, no Astro.

## Commands

| Command        | Action                                                 |
| :------------- | :----------------------------------------------------- |
| `bun install`  | Install dependencies                                   |
| `bun run dev`  | Build and serve at `http://localhost:3000` with watch  |
| `bun run build`| Build the production site to `./dist/`                 |
| `bun run check`| Type-check with `tsc --noEmit`                         |
| `bun test`     | Run unit tests                                         |

## Layout

```
content/posts/     Markdown posts (frontmatter: title, description, publishDate, tags)
public/            Static files served verbatim (favicons, images, matcha gif)
src/
  build.ts         Build pipeline entrypoint
  dev.ts           Dev server + file watcher
  config.ts        Site metadata, menu, intro prose, experiments, talks, social links
  lib/             Markdown, posts, HTML helper, TOC, paginate, date, feeds, writeFile
  templates/       HTML templates (functions returning Html values)
  client/          Client-side TypeScript: theme toggle, menu, search, back-to-top
  styles/          main.css + shiki.css
dist/              Build output (gitignored). Served by Cloudflare Workers Assets.
```
