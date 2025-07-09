<style lang="scss">
    .window {
        display: flex;
        position: relative;

        width: 5rem;
        height: 4rem;

        box-shadow: none;
        transform: none;
        cursor: pointer;

        transition: transform 100ms, box-shadow 200ms;
        transition-timing-function: ease-in-out;

        &:hover {
            box-shadow: 0 0 2rem #fff8;
            transform: scale(1.1);
        }
    }

    .day {
        color: white;
        font-family: "Inter", sans-serif;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: right;
        width: 100%;
        margin: 0.5rem;
        cursor: pointer;

        &--greyed-out {
            color: #888;
        }
    }

    .events-container {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        height: 100%;
        align-items: center;
    }

    .event {
        width: 0.5rem;
        height: 75%;
        margin: 0.1rem;
        

        &--calendar-event {
            background-color: lightblue;
        }

        &--entry-event {
            background-color: yellow;
        }
    }

    .is-current-day {
        position: relative;
        &::after {
            content: "";
            position: absolute;
            width: 2.5rem;
            height: 2.5rem;
            top: -0.4rem;
            right: -0.5rem;
            border: 0.2rem solid #833;
            border-radius: 50%;
        }
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { contextMenu } from "$lib/contextMenuLogic";
    import { calendar } from "$lib/calendarHandler";
    import type { Event } from "$lib/types";
    
    interface Props {
        date?: Date,
        monthDiff: number,
        forceText?: string,
        events: Event[]
    }

    let { date = new Date(), monthDiff, forceText = "", events = [] } : Props = $props();
    
    const currentDate = new Date();

    const test_events = [
        {isCalendarEvent: false, calendarOrigin: null, title: "guten", note: null, startTime: new Date(1749721854420), endTime: null},
        {isCalendarEvent: true, calendarOrigin: null, title: "heute", note: "leute", startTime: new Date(1749721889045), endTime: null}
    ]

    let window: HTMLDivElement;

    function getDateWithEnding() {
        const month = date.toLocaleDateString("en-US", { month: "long" });
        const day = date.getDate();
        switch (day) {
            case 1:
            case 21:
            case 31:
                return `${month} ${day}st`;
            case 2:
            case 22:
                return `${month} ${day}nd`;
            case 3:
            case 23:
                return `${month} ${day}rd`;
            default:
                return `${month} ${day}th`;
        }
    }

    let clickHandler: (e: MouseEvent) => void = (e) => {
        if (monthDiff != 0) {
            calendar.tools.incrementMonth(monthDiff);
        } else {
            contextMenu.open(e, [
                {
                    type: "title",
                    text: getDateWithEnding()
                },
                {
                    type: "link",
                    text: "Add Event",
                    action: () => {
                        console.log("Add Event");
                    }
                },
                {
                    type: "link",
                    text: "Edit Event",
                    action: () => {
                        console.log("Edit Event");
                    }
                },
                {
                    type: "hrow",
                    text: ""
                },
                {
                    type: "link",
                    text: "Delete Event",
                    action: () => {
                        console.log("Delete Event");
                    }
                }
            ]);
        }
    }

const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
};

</script>

<div class="window" bind:this={window} onclick={clickHandler}>
    <div class="events-container">
        {#each events as event}
            <div class="event event--entry-event" class:event--entry-event={!event.isCalendarEvent} class:event--calendar-event={event.isCalendarEvent}>&nbsp;</div>
        {/each}
    </div>
    <p class="day" class:day--greyed-out={monthDiff != 0} class:is-current-day={isSameDay(date, currentDate)}>
        {#if forceText === ""}
            {date.getDate()}
        {:else}
            {forceText}
        {/if}
    </p>
</div>