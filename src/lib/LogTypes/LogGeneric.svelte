<style lang="scss">
    .log {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        gap: 1rem;
        margin: 0 1rem;
    }

    :global(p) {
        color: white;
        font-family: "Inter", sans-serif;
    }

    :global(h2) {
        color: white;
        font-family: "Inter", sans-serif;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
    }

    :global(hr) {
        width: 100%;
    }
</style>

<div class="log">
    <slot />
</div>