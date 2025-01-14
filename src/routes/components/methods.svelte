<script lang="ts">
	import { getSortedComponents } from '../components';
	import BaseContainer from './baseContainer.svelte';
</script>

<BaseContainer>
	<div class="flex-col">
		{#each getSortedComponents() as c}
			<button class="bg-base-100 w-48 h-32 rounded-lg p-2 text-base shadow-lg"> {c} </button>
		{/each}
	</div>
</BaseContainer>
