<script lang="ts">
	import { sites, makeApiUrl } from '$lib/local-storage-store';

	let sitePromise: any = undefined;

	const GetSite = async (idx: number) => {
		if (idx < 0 || idx >= $sites.length) { return; }
		const site = $sites[idx];
		// const url = makeApiUrl(site, 'projects.json');
		// const response = await fetch(url, {
		// 	method: 'GET',
		// 	mode: 'cors',
		// 	credentials: 'include',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'X-Redmine-API-Key': site.key
		// 	}
		// });
		// console.dir(response);
		// if (response.ok) {
		// 	return await response.json();
		// } else {
		// 	throw Error(`status: ${response.status}, ${response.statusText} : url: ${url}`);
		// }
		const url = `/api?tgt=${encodeURIComponent(site.url)}&prm=${encodeURIComponent('projects.json')}&key=${site.key}`;
		const res = await fetch(url);
		if (!res.ok) {
			throw Error(`status: ${res.status}, ${res.statusText} : url: ${url}`);
		}
		return await res.json();
	}
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
          <button class="btn" on:click={() => sitePromise = GetSite(i)}>{site.name} 取得</button>
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
			<p>{JSON.stringify(siteJson)}</p>
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
