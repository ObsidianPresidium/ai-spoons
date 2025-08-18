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
    import { onDestroy } from "svelte";
    import { contextMenu } from "$lib/contextMenuLogic";
    import { calendar, eventCreatorOpen, calendarStateListedDayEvents } from "$lib/calendarHandler";
    import type { CalendarStateListedDayEvents, Event } from "$lib/types";
    
    interface Props {
        date?: Date,
        index: number,
        monthDiff: number,
        forceText?: string
    }

    let { date = new Date(), monthDiff, index, forceText = "" } : Props = $props();

    let events: Event[] = $state($calendarStateListedDayEvents.get(index)!);
    
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
                        $eventCreatorOpen = true;
                    }
                },
                {
                    type: "link",
                    text: "Edit Event",
                    action: () => {
                        $eventCreatorOpen = true;
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
                        $eventCreatorOpen = true;
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

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="window" bind:this={window} onclick={clickHandler}>
    <div class="events-container">
        {#each $calendarStateListedDayEvents.get(index)! as event}
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