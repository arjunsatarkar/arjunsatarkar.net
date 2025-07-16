<script lang="ts">
    import { rasterIcon } from "$lib";
    import PipeSeparator from "./PipeSeparator.svelte";
    import ProjectsGrid from "./ProjectsGrid.svelte";
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
    <meta property="og:image" content={rasterIcon} />
    <meta property="og:description" content={description} />
</svelte:head>

<header>
    <h1><StarText text="Arjun Satarkar"></StarText></h1>

    <nav class="mylinks">
        <a href="mailto:{email}">{email}</a><PipeSeparator></PipeSeparator>
        <a href="https://github.com/arjunsatarkar/">github.com/arjunsatarkar</a>
    </nav>
</header>

<main>
    <h2>Projects</h2>
    <ProjectsGrid></ProjectsGrid>
</main>

<footer>
    <div><ThisPageSource sourceUrl={__FILE_SOURCE__}></ThisPageSource></div>
    <div>
        stars texture:
        <a href="https://commons.wikimedia.org/wiki/File:Starsinthesky.jpg"
            >ESA/Hubble</a
        >, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>,
        via Wikimedia Commons
    </div>
    <a href="/oss-licenses.json">third-party licenses (json)</a>
</footer>

<style>
    header {
        font-size: 1.5rem;
    }

    nav.mylinks {
        font-family: var(--font-monospace);
    }
</style>
