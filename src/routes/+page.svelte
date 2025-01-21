<script lang="ts">
	import 'highlight.js/styles/github.css';
	import AddMethod from './components/addMethod.svelte';
	import { MethodService, type Method, type MethodFunctions } from './services/methods.service';
	import { getComponent } from './components';
	import { onMount } from 'svelte';
	import type { key } from './models/keys';


	
	let keys: key[] = $state([])
	let zarf = $state()

	function showMethods(idx: number) {
		let m: Method = {
			methodType: 'methods',
			idx: idx
		};
		methods.splice(m.idx, 0, m);
	}

	function create(m: Method) {
		methods.splice(m.idx, 0, m);
	}

	function update(m: Method) {}

	function deleteFn(idx: number) {
		methods.splice(idx, 1);
	}

	let fnMethods: MethodFunctions = {
		create: create,
		update: update,
		delete: deleteFn
	};

	let methodService = $state(new MethodService(fnMethods));

	let methods: Method[] = $state([]);

	onMount(() => {
		zarf = {
			keys: keys,
			output: []
		}

		showMethods(0);
	});

</script>

<header class="sticky top-0 flex h-[48px] items-center justify-center bg-base-100 p-1">
	<div class="flex">
		<h1 class="text-center text-lg font-extrabold">🔏 WebCryptoUI</h1>
	</div>
</header>

<div class="flex h-full w-full justify-center">
	<div class="w-full max-w-5xl">
		{#if methods.length >= 0}
			<AddMethod fn={showMethods} idx={0}></AddMethod>
		{/if}

		{#each methods as m, idx}
			{#if m.methodType === 'methods'}
				{@const Component = getComponent(m.methodType)}
				<Component {idx}  bind:methodService bind:zarf></Component>
				<AddMethod fn={showMethods} idx={idx + 1}></AddMethod>
			{:else}
				{@const Component = getComponent(m.methodType)}
				<Component {idx}  bind:methodService bind:zarf></Component>
				<AddMethod fn={showMethods} idx={idx + 1}></AddMethod>
			{/if}
			<!-- <Methods bind:methodService idx={idx + 1}></Methods> -->
		{/each}
	</div>
</div>
