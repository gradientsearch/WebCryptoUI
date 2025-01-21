<script lang="ts">
	import Container from '../container.svelte';
	import { onMount, untrack } from 'svelte';
	import type { HighlightResult } from 'highlight.js';
	import { highlight } from '$lib/hljs';

	let { idx, zarf = $bindable() } = $props();

	let hexData = $state('');
	let outputName = $state('');
	let code: string = $state('');

	$effect(() => {
		hexData;
		untrack(() => {
			code = `\nfunction hexStringToByteArray(hexString: string): number[] {
	return hexString.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? [];
}

let hexString = \`${hexData}\`
let plaintext = new TextDecoder().decode(new Uint8Array(hexStringToByteArray(hexString)));
console.log(uuid); // for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"`;

			hc = highlight(code);
		});
	});

	let output: string | undefined = $state();
	async function hex() {
		let plaintext = new TextDecoder().decode(new Uint8Array(hexStringToByteArray(hexData)));
		output = plaintext;
		zarf.output.push({ name: outputName, data: new Uint8Array(hexStringToByteArray(hexData)) });
	}

	let hc: HighlightResult | undefined = $state();

	onMount(() => {});

	function hexStringToByteArray(hexString: string): number[] {
		return hexString.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? [];
	}
</script>

{#if hc !== undefined}
	<div class="p-2">
		<label for="hexData" class="flex flex-row text-base font-medium text-base-900">
			<span class="pe-4">Hex Data:</span>

		

			<input
				class="ps-2 accent-primary-500"
				type="text"
				placeholder="output name"
				bind:value={outputName}
			/>
		</label>
		<textarea
			id="hexData"
			class="mt-1 w-full min-w-[500px] rounded-md border-gray-200 shadow-sm sm:text-sm"
			rows="4"
			placeholder="hexData"
			bind:value={hexData}
		></textarea>
	</div>

	<Container {idx} bind:hc fn={hex} {output}></Container>
{/if}
