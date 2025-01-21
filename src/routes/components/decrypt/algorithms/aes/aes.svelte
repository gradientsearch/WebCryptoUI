<script lang="ts">
	import { onMount, untrack } from 'svelte';

	let { algorithmParams = $bindable(), zarf = $bindable() } = $props();

	let name = $state('AES-GCM');
	let iv = $state('');
	let input: string = $state('');
	let inputData: Uint8Array = $state(new Uint8Array());

	let names = ['AES-CTR', 'AES-CBC', 'AES-GCM', 'AES-KW'];

	$effect(() => {
		name;
		input;
		iv;
		untrack(() => {
			if (input.length > 0) {
				zarf.output.forEach((o: any) => {
					console.log(input, o);
					if (o.name === input) {
						iv = new TextDecoder().decode(o.data);
						inputData = o.data;
					}
				});
			} else {
				inputData = new TextEncoder().encode(iv);
			}
			algorithmParams = { name: name, iv: inputData };
		});
	});
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

<div class="p-2">
	<label for="input" class="block text-base font-medium text-base-900">input</label>
	<select
		name="input"
		id="input"
		class="border border-primary-600 bg-base-50 focus:ring-primary-600"
		bind:value={input}
	>
		<option value={''}></option>
		{#each zarf.output as o}
			<option value={o.name}>{o.name}</option>
		{/each}
	</select>
</div>

<div class="p-2">
	<label for="aes" class="block text-xs font-medium text-gray-700"> name </label>
	<input placeholder="iv" bind:value={iv} />
</div>
