<style lang="scss">
    .window {
        display: flex;
        background-color: black;
        border: 2px solid white;
        border-radius: 1rem;
        box-shadow: 0 0 2rem #fff8;
        padding: 1rem 0;

        width: min(100%, 35rem);
        height: max(max-content, 20rem);
    }

    p {
        color: white;
        font-family: "Inter", sans-serif;
    }

    form {
        display: none;
    }
</style>

<script lang="ts">
    import Slider from "./Slider.svelte";
    import { onMount } from "svelte";
    import type { Entry } from "$lib/types";
    import LogEntry from "$lib/LogTypes/LogEntry.svelte";
    import LogMood from "$lib/LogTypes/LogMood.svelte";
    import LogNote from "./LogTypes/LogNote.svelte";

    let date = new Date();
    let privateLog = $state(false);
    let buttonHeight = $state("5rem");
    let entry : Entry = {date: date.getTime()};

    let CurrentLog: typeof LogMood | typeof LogNote | typeof LogEntry = $state(LogMood);
    const loggers = new Map();
    loggers.set("basic-mood", LogMood);
    loggers.set("note", LogNote);
    
    let elEntry : HTMLTextAreaElement, elForm: HTMLFormElement;
    let submit = () => {
        elEntry.value = JSON.stringify({...entry, date: entry.date, privacy: privateLog});
        elForm.submit();
    }
    
    export const forceSubmit = (entry: Entry) => {
        elEntry.value = JSON.stringify({...entry, date: entry.date, privacy: privateLog});
        elForm.submit();
    }
    
    let startOver = () => {
        elEntry.value = "";
        elaborate("basic-mood");
    }

    let log = (information: Object) => {
        entry = {...entry, ...information};
        CurrentLog = LogEntry;
    }
    let elaborate = (elaboration: string) => {
        CurrentLog = loggers.get(elaboration);
    }

    onMount(() => {
        if (document.body.clientHeight < 800) {
            buttonHeight = "5rem";
        }
    });
</script>

<div class="window">
    <CurrentLog buttonHeight={buttonHeight} log={log} elaborate={elaborate} submit={submit} startOver={startOver} />
</div>

<p>Logging your mood for {date.toLocaleString()}</p>
<Slider text="Private log (don't inform AI)" bind:checked={privateLog} submittedName="test" />

<form bind:this={elForm} method="POST">
    <textarea name="entry" bind:this={elEntry}></textarea>
</form>