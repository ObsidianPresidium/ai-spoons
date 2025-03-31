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
</style>
<script lang="ts">
    import CalendarDay from "$lib/CalendarDay.svelte";

    let currentDate = new Date();  // change this to a prop later

    function getDaysInMonth() {
        let days = [];
        let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        for (let i=0; i<daysInMonth; i++) {
            days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i+1));
        }
        return days;
    }

    const days = getDaysInMonth();

    function getListedDays() {
        const totalDaysListed = 42;

        // first monday logic
        let index = 0;
        let firstMonday = days[index];
        while (firstMonday.getDay() !== 1) {
            index ++;
            firstMonday = days[index];
        }

        const numDaysBefore = 7 - (firstMonday.getDate() - 1);
        const numDaysAfter = totalDaysListed - numDaysBefore - days.length;
        let daysBefore = [];
        let daysAfter = [];
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        for (let i=0; i<numDaysBefore; i++) {
            let day = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - numDaysBefore + i);
            daysBefore.push(day);
        }

        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        for (let i=1; i<numDaysAfter + 1; i++) {
            let day = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + i);
            daysAfter.push(day);
        }

        return [...daysBefore, ...days, ...daysAfter];
    }


    const listedDays = getListedDays();
</script>

<div class="calendar">
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
        <CalendarDay date={day} isCurrentMonth={day.getMonth() === currentDate.getMonth()} />
    {/each}
</div>