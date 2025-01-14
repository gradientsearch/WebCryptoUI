<script lang="ts">
	import 'highlight.js/styles/github.css';
	import Methods from './components/methods.svelte';
	import AddMethod from './components/addMethod.svelte';
	import { MethodService, type Method, type MethodFunctions } from './services/methods.service';
	import { getComponent } from './components';

	function showMethods(idx: number) {
		let m: Method = {
			methodType: 'methods',
			idx: idx
		};
		methods.splice(m.idx, 0, m);
        console.log(methods)
	}

	function create(m: Method) {
		methods.splice(m.idx, 0, m);
		console.log(methods, m);
	}

	function update(m: Method) {}

	function deleteFn(m: Method) {}

	let fnMethods: MethodFunctions = {
		create: create,
		update: update,
		delete: deleteFn
	};

	let methodService = $state(new MethodService(fnMethods));

	let methods: Method[] = $state([]);
</script>

<header class="bg-base-100 sticky top-0 flex h-[48px] items-center justify-center p-1">
	<div class="flex">
		<h1 class="text-center text-lg font-extrabold">🔏 WebCryptoUI</h1>
	</div>
</header>

<div class="flex h-full w-full justify-center">
	<div class="w-full max-w-5xl">
		{#if methods.length === 0}
			<div class="w-[100%]">
				<Methods bind:methodService idx={0}></Methods>
			</div>
		{/if}

		{#each methods as m, idx}
			{#if idx === 0}
				<AddMethod bind:fn={create} idx={0}></AddMethod>
			{/if}
			{#if m.methodType === 'methods'}
				{@const Component = getComponent(m.methodType)}
                
				<Component idx={idx} bind:methodService></Component>
			{:else}
				{@const Component = getComponent(m.methodType)}
				<Component idx={idx}></Component>
				<AddMethod bind:fn={showMethods} idx={idx + 1}></AddMethod>
			{/if}
			<!-- <Methods bind:methodService idx={idx + 1}></Methods> -->
		{/each}
	</div>
</div>
