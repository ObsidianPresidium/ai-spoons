import type { TSettings } from "$lib/types";
import { writable, get as storeGet } from "svelte/store";
import type { Writable, Unsubscriber } from "svelte/store";

class Settings {
    private settings: Writable<TSettings> = writable({});

    private serviceRegistered = false;
    private serviceDestroyer: Unsubscriber = () => {};
    private pendingServerSettingsUpdateRequest: boolean = false;
    private pendingServerSettingsUpdateDestroyer: ReturnType<typeof setTimeout> | undefined = undefined;

    private save() {
        localStorage.setItem("settings", JSON.stringify(storeGet(this.settings)));
    }

    private load() {
        const retrievedSettings = JSON.parse(localStorage.getItem("settings") ?? '{}');
        return {
            ["desktopNotifications.enabled"]: false,
            ...retrievedSettings
        }
    }

    private updateServerSettings(settings: TSettings) {
        fetch("/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                settings: settings
            })
        });
    }

    public get(key: string | string[]): string | TSettings {
        if (Array.isArray(key)) {
            const result: TSettings = {};
            for (const k of key) {
                result[k] = storeGet(this.settings)[k];
            }
            return result;
        }
        return storeGet(this.settings)[key];
    }

    public set(key: string, value: any) {
        this.settings.update(settings => { return { ...settings, [key]: value } });
        return value;
    }

    public toggle(key: string) {
        let setting: Boolean | undefined = undefined;
        this.settings.update(settings => {
            if (typeof settings[key] === "boolean") {
                setting = !settings[key];
                return { ...settings, [key]: setting };
            } else {
                return settings;
            }
        });
        if (setting === undefined) {
            new Error(`Setting ${key} is not a boolean`);
            return;
        }
        return setting;
    }

    public service() {
        if (this.serviceRegistered) {
            return "service not registered";
        }
        this.settings.set(this.load());
        this.save();
        this.serviceDestroyer = this.settings.subscribe((settings) => {
            this.save();
            if (this.pendingServerSettingsUpdateRequest) {
                if (this.pendingServerSettingsUpdateDestroyer !== undefined) {
                    clearTimeout(this.pendingServerSettingsUpdateDestroyer);
                }
            }
            this.pendingServerSettingsUpdateDestroyer = setTimeout(() => {
                this.pendingServerSettingsUpdateRequest = false;
                this.updateServerSettings(settings);
            }, 3000);
            this.pendingServerSettingsUpdateRequest = true;
        });

        return "service registered";
    }

    public destroyService() {
        this.serviceRegistered = false;
        this.serviceDestroyer();
    }
}

export const settings = new Settings();