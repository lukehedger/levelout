export type PaginatedPage<T> = {
	items: T[];
	current: number;
	total: number;
	url: string;
	prev?: string;
	next?: string;
};

export function paginate<T>(
	items: T[],
	pageSize: number,
	basePath: string,
): PaginatedPage<T>[] {
	if (items.length === 0) {
		return [{ items: [], current: 1, total: 1, url: basePath }];
	}
	const total = Math.ceil(items.length / pageSize);
	const pages: PaginatedPage<T>[] = [];
	for (let i = 0; i < total; i++) {
		const current = i + 1;
		const url = current === 1 ? basePath : `${basePath}page/${current}/`;
		pages.push({
			items: items.slice(i * pageSize, (i + 1) * pageSize),
			current,
			total,
			url,
			prev: current === 1 ? undefined : current === 2 ? basePath : `${basePath}page/${current - 1}/`,
			next: current === total ? undefined : `${basePath}page/${current + 1}/`,
		});
	}
	return pages;
}
