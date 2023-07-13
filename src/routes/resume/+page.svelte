<script>
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	let isPdfPage = true;

	onMount(() => {
		// console.log('Yeah');
		const pdfPath = import.meta.env.BASE_URL + 'test.pdf';
		window.location.replace(pdfPath);

		document.body.style.display = 'none';
	});

	onDestroy(() => {
		isPdfPage = false;
		if (window) {
			document.body.style.display = '';
		}
	});
</script>
