<script lang="ts">
    const { text }: { text: string } = $props();
    import { starTexture } from "$lib";
</script>

<span style:background-image={`url("${starTexture}")`} style:background-clip="text">
    {text}
</span>

<style>
    span {
        color: white;
        display: block;
    }
    @supports (background-clip: text) or (-webkit-background-clip: text) {
        span {
            -webkit-background-clip: text;
            background-clip: text;
            background-color: white;
            background-position: center;
            background-size: 20%;
            color: transparent;
        }
    }
</style>
