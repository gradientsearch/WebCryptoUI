<script lang="ts">

	import Container from './container.svelte';
	import { onMount } from 'svelte';
	import type { HighlightResult } from 'highlight.js';
	import { highlight } from '$lib/hljs';

    let {idx, zarf=$bindable()} = $props()

	let code = `\n/* random uuid */
let uuid = crypto.randomUUID();
console.log(uuid); // for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"`;

	let output: string | undefined = $state();
	function randomUUID() {
		output = crypto.randomUUID();
	}

	let hc: HighlightResult | undefined = $state();

	onMount(() => {
        hc = highlight(code)
	});
</script>

{#if hc !== undefined}
	<Container idx={idx} hc={hc} fn={randomUUID} output={output}></Container>
{/if}
