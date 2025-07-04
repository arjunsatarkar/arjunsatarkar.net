<script>
    let { children } = $props();
    import "$lib/index.css";
    import UbuntuR from "$lib/assets/ubuntu-font-family-0.83/Ubuntu-R.ttf";
    import UbuntuMonoR from "$lib/assets/ubuntu-font-family-0.83/UbuntuMono-R.ttf";
    import FontPreload from "./FontPreload.svelte";
    import { favicon } from "$lib";
</script>

<svelte:head>
    <FontPreload fontPath={UbuntuR} fontType="font/ttf"></FontPreload>
    <FontPreload fontPath={UbuntuMonoR} fontType="font/ttf"></FontPreload>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
