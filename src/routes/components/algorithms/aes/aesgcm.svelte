<script lang="ts">
	import { onMount } from 'svelte';

	let { algorithmParams = $bindable() } = $props();

	onMount(() => {
		algorithmParams = JSON.stringify({ name: 'AES-GCM' });
	});
</script>

<div>
	<label for="aesgcm" class="block text-xs font-medium text-gray-700"> name </label>

	<input
		id="aesgcm"
		type="text"
		disabled
		class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
		value="AES-GCM"
	/>
</div>
