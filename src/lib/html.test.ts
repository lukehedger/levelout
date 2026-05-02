import { describe, expect, test } from "bun:test";
import { attrs, escape, html, raw, render } from "./html.ts";

describe("escape", () => {
	test("escapes &, <, >, \", '", () => {
		expect(escape("<script>alert('x' & \"y\")</script>")).toBe(
			"&lt;script&gt;alert(&#39;x&#39; &amp; &quot;y&quot;)&lt;/script&gt;",
		);
	});

	test("null and undefined render as empty string", () => {
		expect(escape(null)).toBe("");
		expect(escape(undefined)).toBe("");
	});

	test("numbers render as their string form", () => {
		expect(escape(42)).toBe("42");
		expect(escape(0)).toBe("0");
	});
});

describe("html tag", () => {
	test("escapes interpolated strings by default", () => {
		const evil = "<img onerror=alert(1)>";
		expect(render(html`<p>${evil}</p>`)).toBe("<p>&lt;img onerror=alert(1)&gt;</p>");
	});

	test("raw() bypasses escaping", () => {
		expect(render(html`<div>${raw("<em>hi</em>")}</div>`)).toBe("<div><em>hi</em></div>");
	});

	test("nested html() inlines without re-escaping", () => {
		const inner = html`<strong>${"a & b"}</strong>`;
		expect(render(html`<p>${inner}</p>`)).toBe("<p><strong>a &amp; b</strong></p>");
	});

	test("arrays flatten and each item is handled", () => {
		const items = ["one", "two & three"].map((s) => html`<li>${s}</li>`);
		expect(render(html`<ul>${items}</ul>`)).toBe("<ul><li>one</li><li>two &amp; three</li></ul>");
	});

	test("null, undefined, false and true render as empty", () => {
		expect(render(html`<p>${null}${undefined}${false}${true}</p>`)).toBe("<p></p>");
	});

	test("numbers are rendered", () => {
		expect(render(html`<span>${0}/${5}</span>`)).toBe("<span>0/5</span>");
	});
});

describe("attrs", () => {
	test("string values are rendered as name=\"escaped\"", () => {
		expect(render(attrs({ href: "/posts/a&b", title: "X > Y" }))).toBe(
			'href="/posts/a&amp;b" title="X &gt; Y"',
		);
	});

	test("false and undefined values drop the attribute entirely", () => {
		expect(render(attrs({ disabled: false, hidden: undefined, href: "/" }))).toBe('href="/"');
	});

	test("true values emit just the attribute name", () => {
		expect(render(attrs({ disabled: true, href: "/" }))).toBe('disabled href="/"');
	});

	test("the aria-current={cond ? 'page' : false} pattern emits nothing when false", () => {
		const isCurrent = false;
		expect(render(attrs({ "aria-current": isCurrent ? "page" : false }))).toBe("");
	});

	test("the aria-current={cond ? 'page' : false} pattern emits aria-current=\"page\" when true", () => {
		const isCurrent = true;
		expect(render(attrs({ "aria-current": isCurrent ? "page" : false }))).toBe(
			'aria-current="page"',
		);
	});

	test("null drops the attribute", () => {
		expect(render(attrs({ lang: null, dir: "ltr" }))).toBe('dir="ltr"');
	});
});

describe("interpolation integration", () => {
	test("mixing raw SVG blob with escaped text", () => {
		const svg = raw(
			'<svg><path d="M0 0"/></svg>',
		);
		const title = "Close & exit";
		expect(render(html`<button aria-label="${title}">${svg}</button>`)).toBe(
			'<button aria-label="Close &amp; exit"><svg><path d="M0 0"/></svg></button>',
		);
	});
});
