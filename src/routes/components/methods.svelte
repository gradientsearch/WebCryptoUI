<script lang="ts">
	import { getSortedComponents } from '../components';
	import type { MethodService } from '../services/methods.service';
	import BaseContainer from './baseContainer.svelte';
	let { methodService = $bindable<MethodService>(), idx } = $props();

    function add (k: string) {
        methodService.delete(idx)
        methodService.create(k, idx)
    }
</script>

<BaseContainer>
	<div class="flex-col">
		{#each getSortedComponents() as k}
			<button onclick={() => add(k)} class="bg-base-100 h-32 w-48 rounded-lg m-2 text-base shadow-lg"> {k} </button>
		{/each}
	</div>
</BaseContainer>
