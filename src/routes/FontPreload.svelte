<script lang="ts">
    let { fontPath, fontType }: { fontPath: string; fontType: string } =
        $props();
</script>

<link
    rel="preload"
    href={fontPath}
    as="font"
    type={fontType}
    crossorigin="anonymous"
/>
