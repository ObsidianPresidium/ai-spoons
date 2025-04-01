export type TCalendarState = {
    currentDate: Date;
    view: string;
    days: Date[];
}

export type TContextMenuItem = {
    text: string,
    action?: () => void;
}

export type Entry = {
    date: Date;
    privacy?: boolean;
    basicMood?: string;
}

export type Preferences = {
    aiDisabled: boolean;
}

export type User = {
    name: string;
    id: string;
    preferences: Preferences;
    entries: Entry[];
}