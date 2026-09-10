<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

    import NavBar from '$lib/components/Navbar.svelte'

	let { children } = $props();

	import { page } from '$app/state';

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="content">
    <NavBar />
    <div>{@render children()}</div>
</div>

<style>

    div.content {
        height:100%;
        display: flex;
        flex-direction: column;

        :last-child {
            flex-grow: 2;
        }
    }


</style>
