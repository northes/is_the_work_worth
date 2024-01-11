<script lang="ts">
	import {titleEmoji} from '$lib/stores/stores'
	import { _ } from 'svelte-i18n'

	let e :string = '';

	titleEmoji.subscribe((n: string)=>{
		e = n
	})
</script>

<div>
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		{$_('title')} 🤔 <span class="text-primary">?</span>
	</h1>
</div>