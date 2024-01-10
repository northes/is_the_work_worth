<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';

	export let value: string | number | undefined;
	export let tips: string = '';
</script>

<div class="flex items-center gap-3">
	<div class="grow">
		<Input bind:value placeholder="" />
	</div>
	<slot />
</div>
{#if tips !== ''}
	<div class="mt-1">
		<p class="text-xs text-muted-foreground">{tips}</p>
	</div>
{/if}
