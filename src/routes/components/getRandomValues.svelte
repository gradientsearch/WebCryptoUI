<script lang="ts">
	import Container from './container.svelte';
	import { hasContext, onMount, untrack } from 'svelte';
	import type { HighlightResult } from 'highlight.js';
	import { highlight } from '$lib/hljs';

	let typedArray: string = $state('Uint32Array');
	let typedArrayLength: number = $state(10);
	let { idx, zarf=$bindable() } = $props();

	let code = $state('');
	let hc: HighlightResult | undefined = $state();
	let output: string | undefined = $state();

	$effect(() => {
		typedArray;
		typedArrayLength;
		untrack(() => {
			console.log('untracked');
			code = `\nconst array = new ${typedArray}(${typedArrayLength});
crypto.getRandomValues(array);
console.log(bytesToHex(new ${typedArray}(array)))
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
		let t = getTypedArray().get(typedArray);
		const array = new t(typedArrayLength);
		crypto.getRandomValues(array);
		output = bytesToHex(new t(array));
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
			<label for="typedArray" class="block text-base font-medium text-base-900">TypedArray</label>
			<select
				name="typedArray"
				id="typedArray"
				class="border border-primary-600 bg-base-50 focus:ring-primary-600"
				bind:value={typedArray}
			>
				{#each getTypedArray().keys() as k}
					<option value={k}>{k}</option>
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
