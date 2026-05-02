export type Html = { readonly __html: string };

const ESCAPE_MAP: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

export function escape(value: unknown): string {
	if (value == null) return "";
	return String(value).replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch] ?? ch);
}

export function raw(s: string): Html {
	return { __html: s };
}

function isHtml(value: unknown): value is Html {
	return (
		typeof value === "object" &&
		value !== null &&
		"__html" in value &&
		typeof (value as { __html: unknown }).__html === "string"
	);
}

function interp(value: unknown): string {
	if (value == null) return "";
	if (value === false) return "";
	if (value === true) return "";
	if (isHtml(value)) return value.__html;
	if (Array.isArray(value)) return value.map(interp).join("");
	return escape(value);
}

export function html(strings: TemplateStringsArray, ...values: unknown[]): Html {
	let out = "";
	for (let i = 0; i < strings.length; i++) {
		out += strings[i];
		if (i < values.length) out += interp(values[i]);
	}
	return { __html: out };
}

export type AttrValue = string | number | boolean | null | undefined;

export function attrs(a: Record<string, AttrValue>): Html {
	const parts: string[] = [];
	for (const [key, value] of Object.entries(a)) {
		if (value === false || value == null) continue;
		if (value === true) {
			parts.push(key);
			continue;
		}
		parts.push(`${key}="${escape(value)}"`);
	}
	return { __html: parts.join(" ") };
}

export function render(h: Html): string {
	return h.__html;
}
