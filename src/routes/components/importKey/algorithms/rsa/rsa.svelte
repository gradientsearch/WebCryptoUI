<script lang="ts">
	import { onMount, untrack } from 'svelte';

	let { algorithmParams = $bindable() } = $props();

	let hash = $state('SHA-256');
    let name = $state('RSA-OAEP');

	let hashes = ['SHA-256', 'SHA-384', 'SHA-512'];

	let names = ['RSASSA-PKCS1-v1_5', 'RSA-PSS', 'RSA-OAEP'];

    $effect(() => {
        hash;
        name;
        untrack(() => {
            algorithmParams = JSON.stringify({ name: name, hash: hash });
        })
    }
)
</script>

<div>
	<div class="p-2">
		<label for="rsa" class="block text-xs font-medium text-gray-700"> name </label>
		<select
			name="rsa"
			id="rsa"
			class="border border-primary-600 bg-base-50 focus:ring-primary-600"
			bind:value={name}
		>
			{#each names as n}
				<option value={n}>{n}</option>
			{/each}
		</select>
	</div>
	<div class="p-2">
		<label for="format" class="block text-base font-medium text-base-900">Format</label>
		<select
			name="format"
			id="format"
			class="border border-primary-600 bg-base-50 focus:ring-primary-600"
			bind:value={hash}
		>
			{#each hashes as h}
				<option value={h}>{h}</option>
			{/each}
		</select>
	</div>
</div>
