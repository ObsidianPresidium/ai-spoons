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

export type BasicMood = {
    energy: number,
    happiness: number,
    oneclick: boolean
};

export type Entry = {
    date: number;
    privacy?: boolean;
    basicMood: BasicMood;
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