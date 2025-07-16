<script>
    import hitomezashiThumbnail from "$lib/assets/hitomezashi_thumbnail.svg";
</script>

<div class="outerContainer">
    <div class="project">
        <div>
            <h3>
                <a href="https://practicekana.arjunsatarkar.net/"
                    >Practice Japanese Kana
                </a>
            </h3>
            <p>by reading words, then see their meanings.</p>
        </div>
    </div>
    <div class="project">
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
        <img
            src={hitomezashiThumbnail}
            class="thumbnail"
            alt="Hitomezashi pattern"
        />
    </div>
</div>

<style>
    .outerContainer {
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr;
        text-wrap: balance;
    }

    @media (min-width: 700px) {
        .outerContainer {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (min-width: 1300px) {
        .outerContainer {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    .project {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }

    .thumbnail {
        width: 150px;
    }
</style>
