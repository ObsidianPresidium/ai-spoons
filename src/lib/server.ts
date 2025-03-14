import fs from "node:fs";
import type { Entry, User } from "./types";

class Database {
    constructor() {
        this.loadUserFile();
    }
    user: User = {
        name: "Gunnar Gunnarsson",
        id: "1234",
        preferences: {
            aiDisabled: false
        },
        entries: []
    };
    entries: Entry[] = [];
    loadUserFile() {
        try {
            const userFile = fs.readFileSync("user.json", "utf-8");
            this.user = JSON.parse(userFile);
        } catch {
            const userFile = fs.writeFileSync("user.json", JSON.stringify(this.user));
        }
        this.entries = this.user.entries;
        return this.user;
    }
    public addEntry(entry: Entry) {
        this.entries.push(entry);
        this.user.entries = this.entries;
    }
    public saveUserFile() {
        fs.writeFileSync("user.json", JSON.stringify(this.user));
    }
}

export const db = new Database();