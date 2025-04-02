<style lang="scss">
    .window {
        background-color: black;
        border: 2px solid white;
        border-radius: 1rem;
        box-shadow: 0 0 2rem #fff8;

        width: 35rem;
        height: 20rem;
    }

    .log {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        &--hidden {
            display: none;
        }
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
    import Button from "./Button.svelte";
    import Slider from "./Slider.svelte";
    import { onMount } from "svelte";
    import type { Entry } from "$lib/types";

    let date = new Date();
    let privateLog = $state(false);
    let loggers: HTMLDivElement[] = [];
    let entry : Entry = {date};

    let elaborationLevel = "basic";

    let elElaborateDialog: HTMLDivElement, elBasicLog: HTMLDivElement, elEntry : HTMLTextAreaElement, elForm: HTMLFormElement;

    let submit = () => {
        elEntry.value = JSON.stringify({...entry, date: entry.date.toDateString(), privacy: privateLog});
        elForm.submit();
    }

    let startOver = () => {
        elEntry.value = "";
        elaborate("basic-mood");
    }

    let log = (elaboration: string, information: any) => {
        // code to handle the elaboration and information
        if (elaboration === "basic-mood") {
            entry.basicMood = information;
        }
        // toggle elaboration dialog and log
        elElaborateDialog.classList.remove("log--hidden");
        loggers.forEach((logger) => logger.classList.add("log--hidden"));
    }
    let elaborate = (elaboration: string) => {
        if (elaboration === "basic-mood") {
            elBasicLog.classList.remove("log--hidden");
            elElaborateDialog.classList.add("log--hidden");
        }
    }

    onMount(() => {
        loggers = [elBasicLog];
    });
</script>

<div class="window">
    <div class="log" bind:this={elBasicLog}>
        <Button text="Feeling good, energetic" width="15rem" href={() => {log("basic-mood", "energetic happy")}} />
        <Button text="Feeling bad, energetic" width="15rem" href={() => {log("basic-mood", "energetic sad")}} />
        <Button text="Feeling good, exhausted" width="15rem" href={() => {log("basic-mood", "tired happy")}} />
        <Button text="Feeling bad, exhausted" width="15rem" href={() => {log("basic-mood", "tired sad")}} />
    </div>
    <div class="log log--hidden" bind:this={elElaborateDialog}>
        <Button text="Write a note" width="15rem" href={() => elaborate("note")} />
        <Button text="Log this entry" width="15rem" href={submit} />
        <Button text="Start over" width="15rem" href={startOver} />
    </div>
</div>

<p>Logging your mood for {date.toLocaleString()}</p>
<Slider text="Private log (don't inform AI)" bind:checked={privateLog} submittedName="test" />

<form bind:this={elForm} method="POST">
    <textarea name="entry" bind:this={elEntry}></textarea>
</form>