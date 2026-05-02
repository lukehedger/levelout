import { html, type Html } from "~/lib/html.ts";
import { renderLayout } from "./layout.ts";

const BOOKS = [
	"Ask Your Developer - Jeff Lawson",
	"Close to the Machine - Ellen Ullman",
	"Database Internals - Alex Petrov",
	"Mastering Modular JavaScript - Nicolas Bevacqua",
	"Practical Process Automation - Bernd Ruecker",
	"The Soul of a New Machine - Tracy Kidder",
] as const;

const PAPERS = [
	"Autonomous Computing - Pat Helland",
	"Dynamo: Amazon's Highly Available Key-value Store - Amazon.com",
	"Firecracker: Lightweight Virtualization for Serverless Applications - Amazon Web Services",
	"Taming Consensus in the Wild (with the Shared Log Abstraction) - Mahesh Balakrishnan",
	"What Goes Around Comes Around... And Around... - Stonebraker & Pavlo",
] as const;

export function renderReading(): Html {
	const content = html`
		<div class="reading-page">
			<h1 class="title">Reading</h1>
			<p>Recommendations for books and whitepapers to read</p>
			<div class="prose">
				<h3>Books</h3>
				<ul>${BOOKS.map((b) => html`<li>${b}</li>`)}</ul>
				<h3>Papers</h3>
				<ul>${PAPERS.map((p) => html`<li>${p}</li>`)}</ul>
			</div>
		</div>
	`;

	return renderLayout({
		title: "Reading",
		description: "Recommendations for books and whitepapers to read",
		path: "/reading/",
		content,
	});
}
