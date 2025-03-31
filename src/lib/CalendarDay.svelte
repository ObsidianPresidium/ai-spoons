<style lang="scss">
    .window {
        display: flex;

        width: 5rem;
        height: 4rem;

        box-shadow: none;
        transform: none;

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

        &--greyed-out {
            color: #888;
        }
    }
</style>

<script lang="ts">
    interface Props {
        date?: Date,
        isCurrentMonth: boolean,
        forceText?: string
    }

    let { date = new Date(), isCurrentMonth, forceText = "" } : Props = $props();

</script>

<div class="window">
    <p class="day" class:day--greyed-out={isCurrentMonth === false}>
        {#if forceText === ""}
            {date.getDate()}
        {:else}
            {forceText}
        {/if}
    </p>
</div>