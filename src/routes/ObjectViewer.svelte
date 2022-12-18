<script>
	/** @type {{ [s: string]: any; } | ArrayLike<any>} */
	export let data;
</script>

<ul>
	{#each Object.entries(data) as [key, value]}
		{#if value !== null && typeof value === 'object'}
			<li>
				{key} :
				<ul>
					{#each Object.entries(value) as [key2, value2]}
						<li>{key2} : {value2}</li>
					{/each}
				</ul>
			</li>
		{:else}
			<li>{key} : {value}</li>
		{/if}
	{/each}
</ul>
