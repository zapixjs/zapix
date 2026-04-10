export type ProjectStats = {
	stars: number;
	npmDownloads: number;
};

function formatCount(n: number): string {
	if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
	return String(n);
}

export { formatCount };

export async function fetchProjectStats(): Promise<ProjectStats> {
	const [ghRes, npmRes] = await Promise.allSettled([
		fetch('https://api.github.com/repos/zapixjs/zapix', {
			headers: { Accept: 'application/vnd.github+json' },
			next: { revalidate: 3600 },
		}),
		fetch('https://api.npmjs.org/downloads/point/last-week/zapix', {
			next: { revalidate: 3600 },
		}),
	]);

	let stars = 0;
	let npmDownloads = 0;

	if (ghRes.status === 'fulfilled' && ghRes.value.ok) {
		const data = await ghRes.value.json();
		stars = data.stargazers_count ?? 0;
	}

	if (npmRes.status === 'fulfilled' && npmRes.value.ok) {
		const data = await npmRes.value.json();
		npmDownloads = data.downloads ?? 0;
	}

	return { stars, npmDownloads };
}
