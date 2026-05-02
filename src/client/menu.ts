export function initMenu(): void {
	const header = document.getElementById("main-header");
	const button = document.getElementById("toggle-navigation-menu");
	if (!header || !(button instanceof HTMLButtonElement)) return;

	let open = false;
	button.addEventListener("click", () => {
		open = !open;
		header.classList.toggle("menu-open", open);
		button.setAttribute("aria-expanded", String(open));
	});
}
