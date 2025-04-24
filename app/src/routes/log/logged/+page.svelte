<style lang="scss">
    .window {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .background {
        background-color: black;
        width: 100vw;
        height: 100vh;
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
    import Button from "$lib/Button.svelte";
</script>
<div class="background">
    <div class="window">
        <h1>The entry has been logged.</h1>
        <Button text="Return to calendar" href="/calendar" />
    </div>
</div>