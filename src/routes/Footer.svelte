<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { mode, toggleMode } from 'mode-watcher';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuLabel,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { locale, locales,_ } from 'svelte-i18n';

	const localeName = new Map()
	localeName.set("zh-hans","简体中文")
	localeName.set("zh-hant","繁體中文")
	localeName.set("en","English")

</script>

<div class="flex flex-col items-center gap-2 text-sm text-muted-foreground cursor-pointer font-serif">
	<div class="flex space-x-1.5 justify-center">
		<div>
			<Button variant="link" on:click={toggleMode} class="p-0 m-0 text-muted-foreground h-0">
				{#if $mode === 'light'}
					{$_('light')}
				{:else }
					{$_('dark')}
				{/if}
			</Button>
		</div>
		<div>
			.
		</div>
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild let:builder>
					<Button builders={[builder]} variant="link" class="p-0 m-0 text-muted-foreground h-0">{$_('language')}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent class="w-56">
					<DropdownMenuLabel>{$_('choose_language')}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup bind:value={$locale}>
						{#each $locales as l}
							<DropdownMenuRadioItem value={l}>{localeName.get(l)}</DropdownMenuRadioItem>
						{/each}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
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
		Cooking by 🍞 <a class="hover:underline underline-offset-4" href="https://northes.io" target="_blank">northes</a>.
	</div>
</div>