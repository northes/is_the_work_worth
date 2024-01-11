<script>
	import '../app.pcss';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import QA from './QA.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { ModeWatcher } from "mode-watcher";


</script>

<Toaster/>
<ModeWatcher />

<div class="flex flex-row justify-center p-4">
	<div class="w-full md:w-1/2 max-w-[500px] space-y-6 ">
		<div class="mt-8">
			<Header />
		</div>
		<main>
			<slot />
		</main>
		<QA />
		<Footer />
	</div>
</div>


<style>
</style>
