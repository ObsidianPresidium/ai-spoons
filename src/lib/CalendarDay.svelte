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
    import { calendar } from "$lib/calendarHandler";
    
    interface Props {
        date?: Date,
        monthDiff: number,
        forceText?: string
    }

    let { date = new Date(), monthDiff, forceText = "" } : Props = $props();

    let window: HTMLDivElement;

    let clickHandler: () => void = () => {
        if (monthDiff != 0) {
            console.log("Monthdiff", monthDiff);
            calendar.tools.incrementMonth(monthDiff);  // not sure why i need to invert this
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