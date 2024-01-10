<script lang="ts">
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select/index.js';
	import type { ISelectItem } from '$lib/types/selectItem';

	export let source: ISelectItem[];
	// let selected: ISelectItem;
	export let selectedVal: ISelectItem;

	// $: {
	// 	selectedVal = selected ? selected.value : 0;
	// }
</script>


<Select bind:selected={selectedVal}>
	<SelectTrigger>
		<SelectValue />
	</SelectTrigger>
	<SelectContent>
		{#each source as item}
			<SelectItem value={item.value} label={item.label}>
				{item.label}
			</SelectItem>
		{/each}
	</SelectContent>
</Select>