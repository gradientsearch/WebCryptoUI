<script lang="ts">
	import type { HighlightResult } from 'highlight.js';
	import BaseContainer from './baseContainer.svelte';

	let {
		output = $bindable<string>(),
		fn = $bindable<Function>(),
		hc = $bindable<HighlightResult>(),
		idx = $bindable<number>()
	} = $props();
	function copy() {
		if (hc?.code !== undefined) {
			navigator.clipboard.writeText(hc.code).then(
				() => {
					// Text copied successfully
					console.log('Text copied to clipboard');
				},
				() => {
					// Failed to copy text
					console.error('Failed to copy text');
				}
			);
		}
	}
</script>

<BaseContainer>
	<div class="p-2">In: [{`${Number.parseInt(idx)}`}]</div>

	<div class="flex-col w-full">
		<div class=" border-base-200 flex min-w-[500px] w-[100%] items-start border">
			<div class="flex-col w-full">
				<header class="bg-base-10 flex flex-row w-[100%]">
					<button onclick={() => fn()}>run</button>
					<div class="flex-1"></div>
					<button onclick={copy}>copy</button>
				</header>
				<div class="bg-base-50 flex min-w-[100%] justify-between">
					<pre class="hljs">
                <code class="language-typescript">
                  {@html hc.value}
                </code>
              </pre>
				</div>
			</div>
		</div>
		{#if output}
			<div class="pt-10">
				{output}
			</div>
		{/if}
	</div>
</BaseContainer>

<style>
	pre {
		@apply bg-base-50;
	}
</style>
