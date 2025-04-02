<style lang="scss">
    .window {
        display: flex;

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
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { contextMenu } from "$lib/contextMenuLogic";
    import { calendar } from "$lib/calendarHandler";
    
    interface Props {
        date?: Date,
        monthDiff: number,
        forceText?: string
    }

    let { date = new Date(), monthDiff, forceText = "" } : Props = $props();

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

</script>

<div class="window" bind:this={window} onclick={clickHandler}>
    <p class="day" class:day--greyed-out={monthDiff != 0}>
        {#if forceText === ""}
            {date.getDate()}
        {:else}
            {forceText}
        {/if}
    </p>
</div>