import { initBackToTop } from "./backToTop.ts";
import { initMenu } from "./menu.ts";
import { initSearch } from "./search.ts";
import { initTheme } from "./theme.ts";

function init(): void {
	initTheme();
	initMenu();
	initSearch();
	initBackToTop();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
