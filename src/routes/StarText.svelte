<script lang="ts">
    const { text }: { text: string } = $props();
    // @ts-ignore
    import image from "$lib/assets/Starsinthesky/Starsinthesky.jpg?w=3877&h=1241&&fit=cover&format=webp&quality=100&effort=max";
</script>

<span style:background-image={`url("${image}")`} style:background-clip="text">
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
