<style lang="scss">
    .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1rem;
    }
    .window {
        position: relative;
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

    .indicator {
        font-family: "Inter", sans-serif;
        font-weight: bold;
        font-size: 2rem;
        background: none;
        border: none;
        padding: 0;
        transition: color 250ms;
        &:hover:not(.indicator--active) {
            color: lightgrey;
        }
        &--inactive {
            color: grey;
        }
        &--active {
            color: white;
            transition: none;
        }
    }

    .indicator__container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: min-content;
        height: min-content;
        position: absolute;
        transform: translateX(calc(-100% + -2rem));
    }
</style>
<script lang="ts">
    import { calendar, calendarState } from "$lib/calendarHandler";
    import CalendarDay from "$lib/CalendarDay.svelte";
    import { onDestroy } from "svelte";
    import { SvelteMap } from "svelte/reactivity";

    let listedDays = $state(calendar.tools.getListedDays());
    let elDate: HTMLHeadingElement;
    let elDateFake: HTMLHeadingElement;
    let elCalendar: HTMLDivElement;
    let calendarView = $state("monthly");

    let { supabase } = $props();

    let thisMonthsEvents = new SvelteMap();

    let getMonthEvents = async () => {
        thisMonthsEvents = new SvelteMap();
        const startInterval = new Date($calendarState.currentDate.getFullYear(), $calendarState.currentDate.getMonth(), -6).toISOString();
        const endInterval = new Date($calendarState.currentDate.getFullYear(), $calendarState.currentDate.getMonth() + 1, 6).toISOString();
        const { data, error } = await supabase.from("logs").select("data, created_at").gte("created_at", startInterval).lte("created_at", endInterval);
        if (error) throw new Error(error);
        const firstDay = listedDays[0].getTime();
        data.forEach((row: any, index: number) => {
            const currentDay = new Date(row.created_at).getTime();
            const diff = currentDay - firstDay;
            const dayDiff = Math.floor(diff / 86400000);
            const parsedEvents = thisMonthsEvents.get(dayDiff);
            if (parsedEvents && Array.isArray(parsedEvents)) {
                thisMonthsEvents.set(
                    dayDiff,
                    [...parsedEvents, row.data]
                );
            } else {
                thisMonthsEvents.set(
                    dayDiff,
                    [row.data]
                );
            }
        });
        console.log(thisMonthsEvents);
    };

    const destroySubscription = calendarState.subscribe(() => {
        listedDays = calendar.tools.getListedDays();
    });

    const changeMonth = (e: WheelEvent) => {
        calendar.tools.incrementMonth(Math.sign(e.deltaY));
        getMonthEvents();
    };

    getMonthEvents();

    const getEvent = (day: number) => {
        const events = thisMonthsEvents.get(day);
        if (events == null) return []
        return Array.isArray(events) ? events : [];
    }

    const changeCalendarState = (target: string) => {
        if (!["daily", "weekly", "monthly"].includes(target)) {
            throw new Error("Calendar state target must be one of daily, weekly, or monthly!");
        }
        calendar.setCalendarState(target, $calendarState.currentDate);
        calendarView = target;
    }
    
    onDestroy(destroySubscription);
</script>


<div class="window">
    <div class="date">
        <h2 class="date__text">{$calendarState.currentDate.toLocaleString("default", {month: "long"})} {$calendarState.currentDate.getFullYear()}</h2>
    </div>
    <div class="indicator__container">
        <button 
            class="indicator indicator--inactive" 
            class:indicator--active={calendarView === "monthly"}
            onclick={() => changeCalendarState("monthly")}
        >
            Monthly
        </button>
        <button 
            class="indicator indicator--inactive" 
            class:indicator--active={calendarView === "weekly"}
            onclick={() => changeCalendarState("weekly")}
        >
            Weekly
        </button>
        <button 
            class="indicator indicator--inactive" 
            class:indicator--active={calendarView === "daily"}
            onclick={() => changeCalendarState("daily")}
        >
            Daily
        </button>
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
        {#each listedDays as day, index}
            <CalendarDay events={getEvent(index)} date={day} monthDiff={calendar.tools.monthDiff(calendar.tools.getCurrentDate(), day)} />
        {/each}
    </div>
</div>