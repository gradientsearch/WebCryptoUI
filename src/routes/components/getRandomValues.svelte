<script lang="ts">
	import Container from './container.svelte';
	import { hasContext, onMount, untrack } from 'svelte';
	import type { HighlightResult } from 'highlight.js';
	import { highlight } from '$lib/hljs';

	let typedArray: string = $state('Uint16Array');
	let typedArrayLength: number = $state(10);
	let { idx } = $props();

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
console.log(new TextDecoder().decode(array))
`;
			hc = highlight(code);
		});
	});

	function getRandomValues() {
		let t = getTypedArray().get(typedArray);
		const array = new t(10);
		crypto.getRandomValues(array);
		output = new TextDecoder().decode(array);
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
		<p>options:</p>
		<div>
			<select
				name="typesArray"
				id="typesArray"
				class="mt-1.5 w-full rounded-lg border-base-300 text-base text-base-700"
				bind:value={typedArray}
			>
				<option value="">Typed Array</option>
				{#each getTypedArray().keys() as k}
					<option value={k}>{k}</option>
				{/each}
			</select>
		</div>
	</div>
	{hc.code} <br />
	{typedArray}
	<Container {idx} bind:hc fn={getRandomValues} {output}></Container>
{/if}
