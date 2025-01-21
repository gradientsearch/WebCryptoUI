<script lang="ts">
	import { onMount, untrack } from 'svelte';

	let { algorithmParams = $bindable() } = $props();

    let name = $state('RSA-OAEP');

	let names = ['RSASSA-PKCS1-v1_5', 'RSA-PSS', 'RSA-OAEP'];

    $effect(() => {

        name;
        untrack(() => {
            algorithmParams = { name: name};
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
</div>
