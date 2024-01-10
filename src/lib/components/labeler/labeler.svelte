<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	export let label: string;
	export let tips: string = '';

</script>

<div class="flex flex-col mt-1">
	<Label>{label}</Label>
	<div class="mt-2.5">
		<slot />
	</div>
	{#if tips !== ''}
		<div class="mt-1">
			<p class="text-xs text-muted-foreground">{tips}</p>
		</div>
	{/if}
</div>