<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github.css';

	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('typescript', typescript);

	let code = `\n/* random uuid */
let uuid = crypto.randomUUID();
console.log(uuid); // for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"`;

	let randomUUIDOutput: string | undefined = $state();
	function randomUUID() {
		randomUUIDOutput = crypto.randomUUID();
	}
	let hc = hljs.highlight(code, { language: 'typescript' });
	console.log(hc.code);

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

<header class="bg-base-100 sticky top-0 flex h-[48px] items-center justify-center p-1">
	<div class="flex">
		<h1 class="text-center text-lg font-extrabold">🔏 WebCryptoUI</h1>
	</div>
</header>

<div class="flex h-full w-full justify-center">
	<div class="max-w-5xl">
		<div class="mt-4 flex min-w-[500px] flex-row">
			<div>(sidebar)</div>

			<div class=" border-base-200 flex flex-row items-start border">
				<div class="flex-col">
					<button class="bg-base-100 rounded-lg p-2 text-base shadow-lg"> randomUUID() </button>
				</div>
			</div>
		</div>

		<!--  code  -->
		{#if true}
			<div class="mt-4 flex flex-col border border-dashed border-gray-200 p-6">
				<div class="flex flex-row">
					<div>(sidebar)</div>

					<div class=" border-base-200 flex min-w-[500px] flex-row items-start border">
						<div class="flex-col">
							<header class="bg-base-100 flex flex-row">
                                <button onclick={() => randomUUID()}>run</button>
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
                {#if randomUUIDOutput}
                <div class="pt-10">
                    {randomUUIDOutput}
                </div>
                {/if}
			</div>
		{/if}

		{#if false}
			<div class="mt-4 flex flex-row">
				<div>(sidebar)</div>

				<div class=" border-base-200 flex min-w-[500px] flex-row items-start border">
					<div class="flex-col">
						<div class="flex min-w-[100%] justify-between">parameters</div>

						<span class="border-base-200 flex min-w-[100%] flex-1 border-t border-dotted"></span>

						<div>Code</div>
					</div>
				</div>
			</div>
		{/if}
		<!--  Add button  -->
          
		<button
			class="bg-primary-200 mt-4 flex min-w-[100%]  w-100 items-center justify-center rounded-lg p-2 shadow-lg"
		>
			<div class="w-100 flex flex-row">
				<span>Add +</span>
			</div>

			<div></div>
		</button>
	</div>
</div>

<style>
	pre {
		@apply bg-base-50;
	}
</style>
