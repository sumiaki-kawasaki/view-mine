<script lang="ts">
  import { createEventDispatcher } from "svelte";
	import { sites } from '$lib/local-storage-store';

  const dispatch = createEventDispatcher();
  let registName = "";
  let registUrl = "";
  let registKey = "";

  const CloseDialog = () => { 
    dispatch("close");
  };
  const RegistSite = () => {
    if (!Varidate()) { return; }

    sites.add({
      name: registName,
      url: registUrl,
      key: registKey
    });
    CloseDialog();
  };
  const Varidate = () => {
    if (registName == "") {
      alert("登録名が空欄です");
      return false;
    }
    if (registUrl == "") {
      alert("URLが空欄です");
      return false;
    }
    if (registKey == "") {
      alert("API Keyが空欄です");
      return false;
    }
    return true;
  };
</script>

<div class="modal">
  <div class="modal-background">
    <div class="modal-contents">
      <button class="close" on:click={CloseDialog}>x</button>
      <h2>Redmine情報登録</h2>
      <div class="contents">
        <label class="input-name">
          <p>登録名</p>
          <input bind:value={registName} type="text" />
        </label>
        <label class="input-url">
          <p>URL</p>
          <input bind:value={registUrl} type="text" />
        </label>
        <label class="input-key">
          <p>API Key</p>
          <input bind:value={registKey} type="text" />
        </label>
        <div class="buttons">
          <button class="btn" on:click={CloseDialog}>キャンセル</button>
          <button class="btn" on:click={RegistSite}>登録</button>
        </div>
      </div>
    </div>
  </div>
</div>