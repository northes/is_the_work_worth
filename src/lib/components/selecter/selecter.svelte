<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select/index.js';
	import type { ISelectItem } from '$lib/types/selectItem';

	export let label: string;
	export let source: ISelectItem[];
	export let selected: ISelectItem;

	// export let onChange: () => void;

</script>

<div>
	<Label>
		{label}
	</Label>
	<Select bind:selected>
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
</div>