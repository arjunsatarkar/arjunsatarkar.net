<script>
    let { children } = $props();
    import "$lib/index.css";
    import { favicon } from "$lib";
    import { page } from "$app/state";
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <link
        rel="canonical"
        href={new URL(page.url.pathname, __SITE_HOME__).toString()}
    />
</svelte:head>

{@render children()}
