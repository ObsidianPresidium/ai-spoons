<style lang="scss">
    .note {
        display: flex;
        justify-content: start;
        align-items: start;
        width: 100%;
        height: min-content;
        padding: 1rem;
        background-color: white;

        &__text {
            width: 100%;
            margin: 0;
            height: min-content;
            color: black;
            font-size: 1rem;
            &:empty::before {
                color: grey;
                text-align: left;
                content: "Write your thoughts here...";
                height: min-content;
            }
        }
    }
</style>

<script lang="ts">
    import LogGeneric from "./LogGeneric.svelte";
    import Button from "$lib/Button.svelte";

    let { buttonHeight, log, elaborate, submit, startOver } = $props();
    
    let note = $state("");
</script>

<LogGeneric>
    <h2>Write a note:</h2>
    <div class="note">
        <p bind:innerText={note as string} class="note__text" contenteditable></p>
    </div>
    <Button text="Done" height={buttonHeight} href={() => {log({note})}} />
</LogGeneric>