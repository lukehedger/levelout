export function initBackToTop(): void {
	const button = document.getElementById("to-top-btn");
	const target = document.getElementById("blog-hero");
	if (!(button instanceof HTMLButtonElement) || !target) return;

	button.addEventListener("click", () => {
		document.documentElement.scrollTo({ behavior: "smooth", top: 0 });
	});

	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			button.dataset.show = String(!entry.isIntersecting);
		}
	});
	observer.observe(target);
}
