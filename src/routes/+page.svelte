<script lang="ts">
    import PipeSeparator from "./PipeSeparator.svelte";
    import StarText from "./StarText.svelte";
    import ThisPageSource from "./ThisPageSource.svelte";

    const title = "Arjun Satarkar";
    const email = "me@arjunsatarkar.net";
</script>

<svelte:head>
    <title>{title}</title>
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
