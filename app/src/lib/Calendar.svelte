<style lang="scss">
    .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1rem;
    }

    .day-of-week {
        display: flex;
        justify-self: right;
        
        &__text {
            margin: 0 0.5rem;
            color: grey;
            font-family: "Inter", sans-serif;
            font-weight: bold;
            font-size: 1.5rem;
            text-align: right;
            width: 100%;
        }
    }
    .date {
        display: flex;
        justify-content: start;
        &__text {
            color: white;
            font-family: "Inter", sans-serif;
            font-weight: bold;
            font-size: 2rem;

            transition: width 200ms;
        }
    }
</style>
<script lang="ts">
    import { calendar, calendarState } from "$lib/calendarHandler";
    import CalendarDay from "$lib/CalendarDay.svelte";
    import { onDestroy } from "svelte";

    let listedDays = $state(calendar.tools.getListedDays());
    let elDate: HTMLHeadingElement;
    let elDateFake: HTMLHeadingElement;
    let elCalendar: HTMLDivElement;

    const destroySubscription = calendarState.subscribe(() => {
        listedDays = calendar.tools.getListedDays();
    });

    const changeMonth = (e: WheelEvent) => {
        calendar.tools.incrementMonth(Math.sign(e.deltaY));
    };
    
    onDestroy(destroySubscription);
</script>

<div class="window">
    <div class="date">
        <h2 class="date__text">{$calendarState.currentDate.toLocaleString("default", {month: "long"})} {$calendarState.currentDate.getFullYear()}</h2>
    </div>
    <div class="calendar" bind:this={elCalendar} onwheel={changeMonth}>
        <div class="day-of-week">
            <p class="day-of-week__text">M</p>
        </div>
        <div class="day-of-week">
            <p class="day-of-week__text">T</p>
        </div>
        <div class="day-of-week">
            <p class="day-of-week__text">W</p>
        </div>
        <div class="day-of-week">
            <p class="day-of-week__text">T</p>
        </div>
        <div class="day-of-week">
            <p class="day-of-week__text">F</p>
        </div>
        <div class="day-of-week">
            <p class="day-of-week__text">S</p>
        </div>
        <div class="day-of-week">
            <p class="day-of-week__text">S</p>
        </div>
        {#each listedDays as day}
            <CalendarDay date={day} monthDiff={calendar.tools.monthDiff(calendar.tools.getCurrentDate(), day)} />
        {/each}
    </div>
</div>