<script lang="ts">
	import type { HighlightResult } from 'highlight.js';

	let {
		output = $bindable<string>(),
		fn = $bindable<Function>(),
		hc = $bindable<HighlightResult>()
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

<div class="border-base-200 mt-4 flex flex-col border border-dashed p-6">
	<div class="flex flex-row">
		<div>(sidebar)</div>

		<div class=" border-base-200 flex min-w-[500px] flex-row items-start border">
			<div class="flex-col">
				<header class="bg-base-100 flex flex-row">
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
	</div>
	{#if output}
		<div class="pt-10">
			{output}
		</div>
	{/if}
</div>
