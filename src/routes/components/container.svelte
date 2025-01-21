<script lang="ts">
	import type { HighlightResult } from 'highlight.js';
	import BaseContainer from './baseContainer.svelte';

	let {
		output = $bindable<string>(),
		fn = $bindable<Function>(),
		hc = $bindable<HighlightResult>(),
		idx = $bindable<number>()
	} = $props();

	let showCopiedToast = $state(false);
	function copy() {
		showCopiedToast = true;
		setTimeout(() => {
			showCopiedToast = false;
		}, 2000);
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

	<div class="w-[90%] flex-col">
		<div class=" flex w-[100%] items-start border border-base-200">
			<div class="w-[100%] flex-col">
				<header class="flex w-[100%] flex-row bg-base-200">
					<button class="p-1 text-lg hover:scale-110" onclick={() => fn()}>▶</button>
					<div class="flex-1"></div>
					<div class="relative flex flex-col">
						<button class="p-1 text-lg hover:scale-110" onclick={copy}>💾</button>
						{#if showCopiedToast}
							<span class="absolute -right-[4px] bottom-[125%] rounded-lg bg-base-300 p-2"
								>copied</span
							>
						{/if}
					</div>
				</header>
				<div class="flex min-w-[100%] justify-between overflow-hidden overflow-x-scroll bg-base-50">
					<pre class="hljs">
                <code class="language-typescript">
                  {@html hc.value}
                </code>
              </pre>
				</div>
			</div>
		</div>
		{#if output}
			<div class="w-full overflow-hidden break-words pt-10">
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
