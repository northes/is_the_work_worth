<script>
	import '../app.pcss';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import QA from './QA.svelte';
</script>

<div class="flex flex-col gap-4">


	<div class="flex flex-row mt-6">
		<div class="basis-1/4"></div>
		<div class="basis-2/4 space-y-6">
			<Header />
			<main>
				<slot />
			</main>
			<QA />
			<Footer />
		</div>
		<div class="basis-1/4"></div>
	</div>


</div>


<style>
</style>
