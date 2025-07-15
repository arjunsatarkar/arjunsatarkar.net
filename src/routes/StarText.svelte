<script lang="ts">
    const { text }: { text: string } = $props();
    // @ts-ignore
    import starTexture from "$lib/assets/Starsinthesky/Starsinthesky.jpg?w=1000&h=500&format=webp&quality=50&effort=max";
</script>

<span
    style:background-image={`url("${starTexture}")`}
    style:background-clip="text"
>
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
