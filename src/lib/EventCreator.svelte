<style lang="scss">
    .window {
        width: 40rem;
        height: 30rem;
        background-color: #000b;
        backdrop-filter: blur(8px);
        border: 0.2rem solid white;
        box-shadow: 0 0 4rem #fff8;
        position: fixed;
        border-radius: 2rem;
        padding: 2rem;
    }
    .buttons {
        display: flex;
        flex-direction: row-reverse;
        position: absolute;
        gap: 1rem;
        right: 1rem;
        bottom: 1rem;
    }
    * {
        font-family: "Inter", sans-serif;
        color: white;
    }
    .date-flexbox {
        font-size: 2rem;
        display: flex;
        gap: 2rem;
        justify-content: center;
        width: min-content;
    }
</style>

<script lang="ts">
    import ActionButton from "./ActionButton.svelte";
    import { eventCreatorOpen } from "./calendarHandler";
    let { action = "create" } = $props();
    let actionText = $state("");
    let cancelText = $state("");

    switch (action) {
        case "create":
            actionText = "Create Event";
            cancelText = "Cancel";
            break;
        case "edit":
            actionText = "Edit Event";
            cancelText = "Delete Event";
            break;
    }
</script>

<div class="window">
    <h2>Create Event</h2>
    <input type="text" name="" id="title" placeholder="Event Title">
    <h3>Date</h3>
    <div class="date-flexbox">
        <input type="datetime" name="" id="date-from">
        &rarr;
        <input type="datetime" name="" id="date-to">
    </div>
    <div class="buttons">
        <ActionButton text={actionText} href={() => {$eventCreatorOpen = false;}}></ActionButton>
        <ActionButton text={cancelText} color="#ff3b30" href={() => {$eventCreatorOpen = false;}}></ActionButton>
    </div>
</div>