<script lang="ts">
	let { fn = $bindable<Function>(), idx = $bindable<number>() } = $props();
</script>

<button
	onclick={() => fn(idx)}
	class=" w-100 mt-4 flex min-w-[100%] items-center justify-center p-2"
>
	<div class="flex w-[100%] flex-row items-center">
		<span class="border-base-500 h-[1px] w-[100%] flex-1 border-t border-dashed"></span>
		<span class="text-primary-500 px-2">Add +</span>
		<span class="border-base-500 h-[1px] w-[100%] flex-1 border-t border-dashed"></span>
	</div>
</button>
