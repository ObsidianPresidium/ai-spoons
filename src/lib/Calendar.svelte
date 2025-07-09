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
    import { linear, cubicOut } from "svelte/easing";
    import { fade } from "svelte/transition";

    let listedDays = $state(calendar.tools.getListedDays());
    let elDate: HTMLHeadingElement;
    let elDateFake: HTMLHeadingElement;
    let elCalendar: HTMLDivElement;
    let calendarView = $state("month");
    let animationFunctions: void[] = [];
    let animationDays: number[] = [];

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
        if (!["day", "week", "month"].includes(target)) {
            throw new Error("Calendar state target must be one of day, week, or month!");
        }
        calendar.setCalendarState(target, $calendarState.currentDate);
        calendarView = target;

        animationDays = (calendar.tools.getCurrentDate().getDay() === 0) ? 
        Array.from(listedDays.slice(0, 7), (v, index) => index) :
        Array.from(listedDays.slice(7, 14), (v, index) => index + 7);  // Create an array of relevant listed day indexes, e.g. [7, 8, 9, ...]
        const fadeDays = Array.from(listedDays, (v, index) => !animationDays.includes(index));
        listedDays = [];
    }

    const centerAndScale = (node: HTMLElement, params: { delay?: number, duration?: number, easing?: (t: number) => number}) => {
        const calendarRect = elCalendar.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();

        const calendarCenterY = calendarRect.top + (calendarRect.height / 2);
        const nodeCenterY = nodeRect.top + (nodeRect.height / 2);
        const translateY = calendarCenterY - nodeCenterY;
        console.log(`translateY target: ${translateY}`);

        const css = (t: number, u: number) => {
            let opacity = Math.min(t * 2, 1);
            let transform = `scaleY(${u * 2 + 1}) translateY(${nodeRect.height / u - nodeRect.height})`;
            return `opacity: ${opacity}; transform: ${transform}`;
        }

        return {
            delay: params.delay || 0,
            duration: params.duration || 400,
            easing: params.easing || linear,
            css: css
        }
    };

    const dayTransition = (node: HTMLElement, params: { delay?: number, duration?: number, easing?: (t: number) => number, listedDayIndex: number }) => {
        if (animationDays.includes(params.listedDayIndex)) {
            return centerAndScale(node, params);
        }
        return fade(node, {...params, duration: (params.duration || 400) / 2});
    };

    const weekPrint = (days: Date[]) => {
        if (days[0].getMonth() !== days[6].getMonth()) {
            return `${days[0].getDate()} ${days[0].toLocaleString("default", {month: "long"})}-${days[6].getDate()} ${days[6].toLocaleString("default", {month: "long"})}}`;
        }
        return `${days[0].getDate()}-${days[6].getDate()} ${days[0].toLocaleString("default", {month: "long"})}`
    }
    
    onDestroy(destroySubscription);
</script>


<div class="window">
    <div class="date">
        {#if calendarView === "month"}
            <h2 class="date__text">{$calendarState.currentDate.toLocaleString("default", {month: "long"})} {$calendarState.currentDate.getFullYear()}</h2>
        {:else if calendarView === "week"}
            <h2 class="date__text">{weekPrint($calendarState.days)}</h2>
        {:else}
            <h2 class="date__text">${$calendarState.currentDate.getDate()} ${$calendarState.currentDate.getMonth()}</h2>
        {/if}
    </div>
    <div class="indicator__container">
        <button 
            class="indicator indicator--inactive" 
            class:indicator--active={calendarView === "month"}
            onclick={() => changeCalendarState("month")}
        >
            Monthly
        </button>
        <button 
            class="indicator indicator--inactive" 
            class:indicator--active={calendarView === "week"}
            onclick={() => changeCalendarState("week")}
        >
            Weekly
        </button>
        <button 
            class="indicator indicator--inactive" 
            class:indicator--active={calendarView === "day"}
            onclick={() => changeCalendarState("day")}
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
            <div transition:dayTransition={ {listedDayIndex: index} }>
                <CalendarDay events={getEvent(index)} date={day} monthDiff={calendar.tools.monthDiff(calendar.tools.getCurrentDate(), day)} />
            </div>
        {/each}
    </div>
</div>