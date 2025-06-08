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
    import Toggle from "./Toggle.svelte";
    import { onMount } from "svelte";
    import type { Entry } from "$lib/types";
    import LogEntry from "$lib/LogTypes/LogEntry.svelte";
    import LogMood from "$lib/LogTypes/LogMood.svelte";
    import LogNote from "$lib/LogTypes/LogNote.svelte";
    import { goto } from "$app/navigation";

    let date = new Date();
    let privateLog = $state(false);
    let buttonHeight = $state("5rem");
    let entry : Entry = {date: date.getTime(), basicMood: {energy: 0, happiness: 0, oneclick: false}};

    let { supabaseClient } = $props();



    let CurrentLog: typeof LogMood | typeof LogNote | typeof LogEntry = $state(LogMood);
    const loggers = new Map();
    loggers.set("basic-mood", LogMood);
    loggers.set("note", LogNote);
    
    let elEntry : HTMLTextAreaElement, elForm: HTMLFormElement;
    let submit = async () => {
        const supabaseUser = await supabaseClient.auth.getUser()
        const id = supabaseUser.data.user?.id;
        const logRow = {
            user_id: id,
            ai_disabled: privateLog,
            data: entry
        };
        console.log(supabaseUser);
        console.log(`Supabase UID: ${id}, Json: ${logRow}`);
        const { error } = await supabaseClient.from("logs").insert(logRow);
        if (error) console.error(error);
        goto("/app/log/logged");
    }
    
    export const forceSubmit = async (entry: Entry) => {
        const supabaseUser = await supabaseClient.auth.getUser()
        const id = supabaseUser.data.user?.id;
        const logRow = {
            user_id: id,
            ai_disabled: privateLog,
            data: entry
        };
        console.log(supabaseUser);
        console.log(`Supabase UID: ${id}, Json: ${logRow}`);
        const { error } = await supabaseClient.from("logs").insert(logRow);
        if (error) console.error(error);
        goto("/app/log/logged");
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
    let getCurrentEntry = () => {
        return entry;
    }

    onMount(() => {
        if (document.body.clientHeight < 800) {
            buttonHeight = "5rem";
        }
    });
</script>

<div class="window">
    <CurrentLog buttonHeight={buttonHeight} log={log} elaborate={elaborate} submit={submit} startOver={startOver} getCurrentEntry={getCurrentEntry} />
</div>

<p>Logging your mood for {date.toLocaleString()}</p>
<Toggle text="Private log (don't inform AI)" bind:checked={privateLog} submittedName="test" />

<form bind:this={elForm} method="POST">
    <textarea name="entry" bind:this={elEntry}></textarea>
</form>