<script>
	import { sites } from '$lib/local-storage-store';
</script>

<svelte:head>
	<title>SiteList</title>
	<meta name="description" content="Regist Redmine Site" />
</svelte:head>

<h1>登録Redmine情報</h1>
<div>
  {#if $sites.length > 0}
    <ul class="site-list">
      {#each $sites as site }
        <li>
          <p>site.name</p>
          <p>site.url</p>
          <p>site.key</p>
        </li>			
      {/each}
    </ul>
  {:else}
    <p>登録は0件です</p>
  {/if}
</div>