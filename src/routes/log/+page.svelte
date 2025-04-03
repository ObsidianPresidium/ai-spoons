<style lang="scss">
    .window {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
    }

    .background {
        background-color: black;
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: -1;
    }

    h1 {
        font-family: "Inter", sans-serif;
        font-size: 2rem;
        font-weight: bold;
        color: white;
        text-align: center;
    }
</style>

<script lang="ts">
    import Logger from "$lib/Logger.svelte";
</script>
<div class="background">
</div>

<div class="window">
    <h1>How are you feeling right now?</h1>
    <Logger />
</div>