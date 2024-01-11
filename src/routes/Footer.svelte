<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { mode, toggleMode } from 'mode-watcher';
</script>

<div class="flex flex-col items-center gap-2 text-sm text-muted-foreground cursor-pointer font-serif">
	<div class="flex space-x-1.5 justify-center">
		<div>
			<Button variant="link" on:click={toggleMode} class="p-0 m-0 text-muted-foreground h-0">
				{#if $mode === 'light'}
					Light
				{:else }
					Dark
				{/if}
			</Button>
		</div>
		<div>
			.
		</div>
		<div>
			<Button variant="link" class="p-0 m-0 text-muted-foreground h-0">Language</Button>
		</div>
		<div>
			.
		</div>
		<div>
			<a target="_blank" href="https://github.com/northes/is_the_work_worth" class="hover:underline underline-offset-4">Github</a>
		</div>
		<div>
			.
		</div>
		<div>
			<a target="_blank" href="https://vercel.com/" class="hover:underline underline-offset-4">Vercel</a>
		</div>
	</div>
	<div>
		Power by 🍞 <a class="hover:underline underline-offset-4" href="https://northes.io" target="_blank">northes</a>.
	</div>
</div>