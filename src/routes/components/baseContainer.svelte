<script lang="ts">
    let {children} = $props()
</script>

<div class="border-base-200 mt-4 flex flex-col border border-dashed p-6">
	<div class="flex flex-row">
        {@render children?.()}
    </div>
</div>
