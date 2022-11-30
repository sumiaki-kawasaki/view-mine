<script lang="ts">
	import { sites } from '$lib/local-storage-store';
  import RegistSiteDialog from './RegistSiteDialog.svelte';

  let isShowRegistDialog = false;
  const ShowRegistDialog = () => isShowRegistDialog = true;
  const CloseRegistDialog = () => isShowRegistDialog = false;
  const DeleteSite = (idx: number) => {
    sites.remove(idx);
  };
  const ChangeSite = (idx: number) => {
    // TODO
  };
</script>

<svelte:head>
	<title>SiteList</title>
	<meta name="description" content="Regist Redmine Site" />
</svelte:head>

<h1>登録Redmine情報</h1>
<div>
  <button type="button" class="btn" on:click={ShowRegistDialog}>Redmine追加</button>
  {#if $sites.length > 0}
    <ul class="site-list">
      {#each $sites as site, i}
        <li>
          <p>{site.name}</p>
          <p>{site.url}</p>
          <p>{site.key}</p>
          <div class="buttons">
            <button class="btn" on:click={() => ChangeSite(i)}>変更</button>
            <button class="btn" on:click={() => DeleteSite(i)}>削除</button>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <p>登録は0件です</p>
  {/if}
</div>

{#if isShowRegistDialog}
  <RegistSiteDialog on:close={CloseRegistDialog} />
{/if}