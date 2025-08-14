<style lang="scss">
    .event-creator-div {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<script lang="ts">
    import Logger from "$lib/Logger.svelte";
    import EventCreator from "$lib/EventCreator.svelte";
    import { eventCreatorOpen } from "$lib/calendarHandler";
    import type { CalendarEvent, Entry } from "$lib/types";

    type DummyEntry = {
        time: string,
        content: Entry
    };
    type DummyEvent = {
        time: string,
        content: any
    }

    let { data } = $props();
    let dummyEntries: DummyEntry[] = [];
    let calendarEvents: DummyEvent[] = [];
    let mode = $state("logger");
    let currentTime: string;
    let logDummy = (entry: Entry) => {
        dummyEntries.push({time: currentTime, content: entry});
    }
    let eventDummy = (calendarEvent: CalendarEvent) => {
        calendarEvents.push({time: currentTime, content: calendarEvent});
    }
</script>

<p>Set time: <input type="datetime" bind:value={currentTime}></p>
{#if mode === "logger"}
    <Logger supabaseClient={data.supabase} dummyMode bind:logDummy={logDummy} />
{:else}
    <button on:click={() => $eventCreatorOpen = true}>Toggle Event Creator</button>
    {#if $eventCreatorOpen}
        <div class="event-creator-div">
            <EventCreator dummyMode bind:eventDummy={eventDummy} />
        </div>
    {/if}
{/if}

<button on:click={interpret}>Interpret</button>