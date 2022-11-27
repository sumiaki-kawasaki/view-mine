<script>
	import { sites } from '$lib/local-storage-store';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Redmie Viewer with Svelte" />
</svelte:head>

<section>
	<h1>
		wellcome to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
