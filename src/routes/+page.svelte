<script lang="ts">
    import { favicon } from "$lib";
    import PipeSeparator from "./PipeSeparator.svelte";
    import StarText from "./StarText.svelte";
    import ThisPageSource from "./ThisPageSource.svelte";

    const title = "Arjun Satarkar";
    const email = "me@arjunsatarkar.net";
    const description = "Arjun Satarkar's home page.";
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={__SITE_HOME__} />
    <meta property="og:image" content={favicon} />
    <meta property="og:description" content={description} />
</svelte:head>

<h1><StarText text="Arjun Satarkar"></StarText></h1>

<nav class="mylinks">
    <a href="mailto:{email}">{email}</a><PipeSeparator></PipeSeparator>
    <a href="https://github.com/arjunsatarkar/">github.com/arjunsatarkar</a>
</nav>

<footer>
    <ThisPageSource sourceUrl={__FILE_SOURCE__}></ThisPageSource>
    <details>
        <summary>more</summary>
        stars texture:
        <a href="https://commons.wikimedia.org/wiki/File:Starsinthesky.jpg"
            >ESA/Hubble</a
        >, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>,
        via Wikimedia Commons
    </details>
</footer>

<style>
    nav.mylinks {
        font-family: var(--font-monospace);
    }
</style>
