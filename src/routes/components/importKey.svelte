<script lang="ts">
	import Container from './container.svelte';
	import { hasContext, onMount, untrack } from 'svelte';
	import type { HighlightResult } from 'highlight.js';
	import { highlight } from '$lib/hljs';

	let format: string = $state('jwk');
	let keyData: string = $state('');
	let algorithm: string = $state('');
	let extractable: boolean = $state(true);
	let keyUsages: string[] = $state([]);

	let typedArrayLength: number = $state(10);
	let { idx } = $props();

	let code = $state('');
	let hc: HighlightResult | undefined = $state();
	let output: string | undefined = $state();

	let formats: string[] = ['jwk']; // ['raw', 'pkcs8', 'spki', 'jwk'];

	$effect(() => {
		format;
		typedArrayLength;
		untrack(() => {
			console.log('untracked');
			code = `\nconst array = new ${format}(${typedArrayLength});
crypto.getRandomValues(array);
console.log(bytesToHex(new Uint8Array(array)))
`;
			hc = highlight(code);
		});
	});

	function bytesToHex(bytes: Uint8Array) {
		return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
	}

	function hexStringToByteArray(hexString: string): number[] {
		return hexString.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? [];
	}

	function getRandomValues() {
		let t = getTypedArray().get(format);
		const array = new t(typedArrayLength);
		crypto.getRandomValues(array);
		output = bytesToHex(new Uint8Array(array));
	}

	function getTypedArray(): Map<String, any> {
		return new Map<String, any>([
			['Int8Array', Int8Array],
			['Uint8Array', Uint8Array],
			['Uint8ClampedArray', Uint8ClampedArray],
			['Int16Array', Int16Array],
			['Uint16Array', Uint16Array],
			['Int32Array', Int32Array],
			['Uint32Array', Uint32Array],
			['BigInt64Array', BigInt64Array],
			['BigUint64Array', BigUint64Array]
		]);
	}

	onMount(() => {
		hc = highlight(code);
	});
</script>

{#if hc !== undefined}
	<div class="flex flex-row">
		<div class="p-2">
			<label for="format" class="block text-base font-medium text-base-900">Format</label>
			<select
				name="format"
				id="format"
				class="border border-primary-600 bg-base-50 focus:ring-primary-600"
				bind:value={format}
			>
				{#each formats as f}
					<option value={f}>{f}</option>
				{/each}
			</select>
		</div>

		<div class="p-2">
			<label for="typedArrayLength" class="block text-base font-medium text-base-900">
				Length</label
			>

			<input
				type="number"
				id="typedArrayLength"
				class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
				bind:value={typedArrayLength}
			/>
		</div>
	</div>

	<Container {idx} bind:hc fn={getRandomValues} {output}></Container>
{/if}
