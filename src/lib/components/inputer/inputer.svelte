<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';

	export let value: string | number | undefined;
</script>

<div class="flex items-center gap-3">
	<div class="grow">
		<Input bind:value placeholder="" />
	</div>
	<slot />
</div>

