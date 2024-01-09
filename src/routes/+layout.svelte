<script>
	import '../app.pcss';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import QA from './QA.svelte';
</script>

<div class="flex flex-row mt-6 justify-center">
	<div class="max-w-[500px] space-y-6 ">
		<Header />
		<main>
			<slot />
		</main>
		<QA />
		<Footer />
	</div>
</div>


<style>
</style>
