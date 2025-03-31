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
</style>

<script lang="ts">
    import Calendar from "$lib/Calendar.svelte";
</script>
<div class="background">
    <div class="window">
        <Calendar />
    </div>
</div>