import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

export async function writeFile(
	distDir: string,
	relPath: string,
	contents: string | Uint8Array,
): Promise<void> {
	const full = join(distDir, relPath);
	await mkdir(dirname(full), { recursive: true });
	await Bun.write(full, contents);
}
