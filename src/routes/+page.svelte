<script lang="ts">
	import { sites, makeApiUrl } from '$lib/local-storage-store';
	import ObjectViewer from './ObjectViewer.svelte';

	let sitePromise: any = undefined;
	let siteName = '';

	const GetSite = async (idx: number) => {
		if (idx < 0 || idx >= $sites.length) {
			return;
		}
		const site = $sites[idx];
		// const url = makeApiUrl(site, 'projects.json');
		const url = makeApiUrl(site, 'time_entries.json?from=2023-10-01&to=2024-10-31&user_id=me');
		console.log(`url: ${url}`);
		console.log(`url2: ${decodeURIComponent(url)}`);
		siteName = site.name;
		const res = await fetch(url);
		if (!res.ok) {
			throw Error(`status: ${res.status}, ${res.statusText} : url: ${url}`);
		}
		return await res.json();
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Redmie Viewer with Svelte" />
</svelte:head>

<section>
	{#if $sites.length > 0}
		<ul class="site-list">
			{#each $sites as site, i}
				<li>
					<button class="btn" on:click={() => (sitePromise = GetSite(i))}>{site.name} 取得</button>
				</li>
			{/each}
		</ul>
	{:else}
		<p>登録は0件です</p>
	{/if}
	{#if sitePromise != undefined}
		{#await sitePromise}
			<p>...アクセス中</p>
		{:then siteJson}
			<!-- {#if siteJson['projects'] != null} -->
			{#if siteJson['time_entries'] != null}
				<p>{siteName} : Projects</p>
				<!-- {#each siteJson['projects'] as project} -->
				{#each siteJson['time_entries'] as project}
					<ObjectViewer data={project} />
				{/each}
			{/if}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
