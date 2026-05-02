type SearchDoc = {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	date: string;
	body: string;
};

let docs: SearchDoc[] | null = null;
let docsPromise: Promise<SearchDoc[]> | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

async function loadDocs(): Promise<SearchDoc[]> {
	if (docs) return docs;
	if (docsPromise) return docsPromise;
	docsPromise = fetch("/search.json")
		.then((r) => r.json())
		.then((data: SearchDoc[]) => {
			docs = data;
			return data;
		});
	return docsPromise;
}

function scoreMatch(doc: SearchDoc, q: string): number {
	if (doc.title.toLowerCase().includes(q)) return 4;
	if (doc.description.toLowerCase().includes(q)) return 3;
	if (doc.tags.join(" ").toLowerCase().includes(q)) return 2;
	if (doc.body.toLowerCase().includes(q)) return 1;
	return 0;
}

function render(results: SearchDoc[], list: HTMLElement): void {
	list.innerHTML = "";
	if (results.length === 0) {
		const li = document.createElement("li");
		li.className = "search-no-results";
		li.textContent = "No matches";
		list.append(li);
		return;
	}
	for (const doc of results) {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = `/posts/${doc.slug}/`;
		const strong = document.createElement("strong");
		strong.textContent = doc.title;
		const br = document.createElement("br");
		const small = document.createElement("small");
		small.textContent = doc.description;
		a.append(strong, br, small);
		li.append(a);
		list.append(li);
	}
}

function isTypingTarget(el: EventTarget | null): boolean {
	if (!(el instanceof HTMLElement)) return false;
	if (el.isContentEditable) return true;
	const tag = el.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export function initSearch(): void {
	const container = document.getElementById("search");
	if (!container) return;
	const dialog = container.querySelector("dialog");
	const openBtn = container.querySelector<HTMLButtonElement>("[data-open-modal]");
	const closeBtn = container.querySelector<HTMLButtonElement>("[data-close-modal]");
	const input = container.querySelector<HTMLInputElement>("#search-input");
	const results = container.querySelector<HTMLUListElement>("#search-results");
	if (!(dialog instanceof HTMLDialogElement) || !openBtn || !closeBtn || !input || !results) return;

	openBtn.disabled = false;

	const close = (): void => {
		if (dialog.open) dialog.close();
	};

	const open = (): void => {
		if (dialog.open) return;
		dialog.showModal();
		input.focus();
		void loadDocs();
	};

	openBtn.addEventListener("click", open);
	closeBtn.addEventListener("click", close);

	dialog.addEventListener("click", (e) => {
		if (e.target === dialog) close();
	});

	input.addEventListener("input", () => {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			const q = input.value.trim().toLowerCase();
			if (q.length < 2) {
				results.innerHTML = "";
				return;
			}
			const all = await loadDocs();
			const matches = all
				.map((doc) => ({ doc, score: scoreMatch(doc, q) }))
				.filter(({ score }) => score > 0)
				.sort((a, b) => b.score - a.score)
				.slice(0, 10)
				.map(({ doc }) => doc);
			render(matches, results);
		}, 50);
	});

	window.addEventListener("keydown", (e) => {
		if (e.key === "/" && !dialog.open && !isTypingTarget(e.target)) {
			e.preventDefault();
			open();
		}
	});
}
