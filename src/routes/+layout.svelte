<script>
    let { children } = $props();
    import "$lib/index.css";
    import { favicon } from "$lib";
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
