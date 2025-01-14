<script lang="ts">
	import 'highlight.js/styles/github.css';
	import RandomUuid from './components/randomUUID.svelte';

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
			<RandomUuid></RandomUuid>
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
