<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github.css';

	import typescript from 'highlight.js/lib/languages/typescript';
	import Container from './container.svelte';
	import { onMount } from 'svelte';
	import type { HighlightResult } from 'highlight.js';

	hljs.registerLanguage('typescript', typescript);

	let code = `\n/* random uuid */
let uuid = crypto.randomUUID();
console.log(uuid); // for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"`;

	let output: string | undefined = $state();
	function randomUUID() {
		output = crypto.randomUUID();
	}

	let hc: HighlightResult | undefined = $state();

	onMount(() => {
		hc = hljs.highlight(code, { language: 'typescript' });
	});
</script>

{#if hc !== undefined}
	<Container hc={hc} fn={randomUUID} output={output}></Container>
{/if}
