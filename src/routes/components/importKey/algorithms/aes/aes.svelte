<script lang="ts">
	import { onMount, untrack } from 'svelte';


	let { algorithmParams = $bindable() } = $props();

	let name = $state('AES-GCM')
	let names = ['AES-CTR', 'AES-CBC', 'AES-GCM', 'AES-KW']

	$effect(() => {
		name;
		untrack(() => {
			algorithmParams = JSON.stringify({ name: name });
		})
	})
	
</script>

<div class="p-2">
	<label for="aes" class="block text-xs font-medium text-gray-700"> name </label>
	<select
		name="aes"
		id="aes"
		class="border border-primary-600 bg-base-50 focus:ring-primary-600"
		bind:value={name}
	>
		{#each names as n}
			<option value={n}>{n}</option>
		{/each}
	</select>
</div>
