export type TCalendarState = {
    currentDate: Date;
    view: string;
    days: Date[];
}

export type TContextMenuItem = {
    type: string;
    text: string;
    action?: () => void;
}

export type BasicMood = "energetic happy" | "energetic sad" | "tired happy" | "tired sad";

export type Entry = {
    date: Number;
    privacy?: boolean;
    basicMood?: BasicMood;
    note?: string;
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