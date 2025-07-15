<script lang="ts">
    import { rasterIcon } from "$lib";
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
    <div class="projects">
        <div>
            <h3>
                <a href="https://practicekana.arjunsatarkar.net/"
                    >Practice Japanese Kana
                </a>
            </h3>
            <p>by reading words, then see their meanings.</p>
        </div>
        <div>
            <h3>
                <a href="https://hitomezashi.arjunsatarkar.net/"
                    >Create Hitomezashi Patterns
                </a>
            </h3>
            <p>
                which you can download as SVG and share links to.
                <span class="deemphasized"
                    >(<a
                        href="https://www.clivemaxfield.com/coolbeans/another-slice-of-the-pi-with-hitomezashi-stitch-patterns/"
                        >what is hitomezashi?</a
                    >)</span
                >
            </p>
        </div>
    </div>
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

    h1,
    h2,
    h3 {
        font-weight: 500;
    }

    div.projects {
        display: flex;
        flex-flow: row wrap;
    }

    div.projects > div {
        flex: 1 0 33.33%;
    }

    div.projects p {
        text-wrap: balance;
    }

    nav.mylinks {
        font-family: var(--font-monospace);
    }
</style>
