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

export type TSettings = {
    [key: string]: any;
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

export type Settings = {}

export type User = {
    name: string;
    id: string;
    settings: Settings;
    entries: Entry[];
}