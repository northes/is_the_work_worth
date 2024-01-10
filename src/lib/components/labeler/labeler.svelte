<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	export let label: string;
</script>

<div class="flex flex-col">
	<Label>{label}</Label>
	<div class="mt-2.5">
		<slot />
	</div>
</div>