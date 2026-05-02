function rootInDarkMode(): boolean {
	return document.documentElement.getAttribute("data-theme") === "dark";
}

export function initTheme(): void {
	const button = document.getElementById("theme-toggle");
	if (!(button instanceof HTMLButtonElement)) return;

	const sync = (): void => {
		button.setAttribute("aria-checked", String(rootInDarkMode()));
	};
	sync();

	button.addEventListener("click", () => {
		const next = rootInDarkMode() ? "light" : "dark";
		document.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: next } }));
		sync();
	});
}
