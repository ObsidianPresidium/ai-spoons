import type { TCalendarState } from '$lib/types';
import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';

type RangeString = "month" | "week" | "day";

function getDaysInRange(date: Date, range: RangeString): Date[] {
    let days = [];
    if (range === "month") {
        let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        for (let i=0; i<daysInMonth; i++) {
            days.push(new Date(date.getFullYear(), date.getMonth(), i+1));
        }
    } else if (range === "week") {
        for (let i=0; i < 7; i++) {
            days.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + i + 1))
        }
    } else if (range === "day") {
        return [date];
    } else {
        throw new TypeError("parameter range not one of 'day', 'week', or 'month'");
    }
    return days;
}

export const calendarState: Writable<TCalendarState> = writable<TCalendarState>({
    currentDate: new Date(),
    view: 'month',
    days: getDaysInRange(new Date(), "month")
});

export const eventCreatorOpen: Writable<boolean> = writable<boolean>(false);

const setCalendarState = (view: string, date: Date) => {
    if (view) {
        calendarState.update(state => {
            state.view = view;
            return state;
        });
    }
    if (date) {
        calendarState.update(state => {
            state.currentDate = date;
            state.days = getDaysInRange(date, state.view as RangeString);
            return state;
        });
    } else {
        calendarState.update(state => {
            state.days = getDaysInRange(state.currentDate, state.view as RangeString);
            return state;
        });
    }
}

export const calendar = {
    setCalendarState,
    tools: {
        getCurrentDate: () => { return get(calendarState).currentDate; },
        getCalendarState: () => { return get(calendarState).view },
        getListedDays: () => {
            const _calendarState = get(calendarState);
            
            if (_calendarState.view === "week" || _calendarState.view === "day") return _calendarState.days;
            let index = 0;
            let firstMonday = _calendarState.days[index];
            while (firstMonday.getDay() !== 1) {
                index ++;
                firstMonday = _calendarState.days[index];
            }
        
            const numDaysBefore = (7 - (firstMonday.getDate() - 1)) % 7;
            const numWeeksListed = Math.ceil((numDaysBefore + _calendarState.days.length) / 7);
            const totalDaysListed = numWeeksListed * 7;
            const numDaysAfter = totalDaysListed - numDaysBefore - _calendarState.days.length;
            let daysBefore = [];
            let daysAfter = [];
            
            const firstDay = new Date(_calendarState.currentDate.getFullYear(), _calendarState.currentDate.getMonth(), 1);
            for (let i=0; i<numDaysBefore; i++) {
                let day = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - numDaysBefore + i);
                daysBefore.push(day);
            }
        
            const lastDay = new Date(_calendarState.currentDate.getFullYear(), _calendarState.currentDate.getMonth() + 1, 0);
            for (let i=1; i<numDaysAfter + 1; i++) {
                let day = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + i);
                daysAfter.push(day);
            }
        
            return [...daysBefore, ..._calendarState.days, ...daysAfter];
        },
        incrementMonth: (i: number) => {
            const currentDate = get(calendarState).currentDate;
            const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
            setCalendarState("month", nextMonth);
            return nextMonth;
        },
        monthDiff: (date1: Date, date2: Date) => {
            const monthDiff = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth());
            return monthDiff;
        }
    }
};