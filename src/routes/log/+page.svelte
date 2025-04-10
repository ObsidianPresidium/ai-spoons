<style lang="scss">
    .window {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
    }

    .background {
        background-color: black;
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: -1;
    }

    h1 {
        font-family: "Inter", sans-serif;
        font-size: 2rem;
        font-weight: bold;
        color: white;
        text-align: center;
    }
</style>

<script lang="ts">
    import { contextMenu } from "$lib/contextMenuLogic";
    import ContextMenu from "$lib/ContextMenus/ContextMenu.svelte";
    import Logger from "$lib/Logger.svelte";
    import type { TContextMenuItem, Entry, BasicMood } from "$lib/types";
    import { settings } from "$lib/settings";
    import Service from "$lib/Service.svelte";
    
    let compLogger: Logger;

    const devMenuItems: TContextMenuItem[] = [
        {
            type: "title",
            text: "Dev Menu"
        },
        {
            type: "link",
            text: "Log Test Entry",
            action: () => {
                const mood: BasicMood = {
                    energy: Math.floor(Math.random() * 10) + 1,
                    happiness: Math.floor(Math.random() * 10) + 1,
                    oneclick: false
                };
                const entry = {
                    privacy: false,
                    note: "This is a test entry.",
                    basicMood: mood,
                    date: new Date().getTime(),
                };
                console.log(`Submitting test entry ${entry} to server...`);
                compLogger.forceSubmit(entry);
            }
        },
        {
            type: "link",
            text: "Retrieve Stored Entry",
            action: async () => {
                const response = await fetch("/api/entry");
                const data = await response.json();
                const entry: Entry = data.entries[data.entries.length - 1];
                let entryString = "";
                if (data.entries.length === 0) {
                    entryString = "No entries found.";
                } else {
                    entryString = `Entries stored: ${data.entries.length}\n`
                    + `Latest entry: ${new Date(entry.date).toUTCString()}\n`
                    + `Latest entry energy: ${entry.basicMood.energy}\n`
                    + `Latest entry happiness: ${entry.basicMood.happiness}\n`
                    + `Logged using One-Click: ${(entry.basicMood.oneclick) ? "yes":"no"}\n`
                    + `User requested privacy: ${(entry.privacy) ? "yes":"no"}\n`;
                    if (entry.note) {
                        entryString += `Latest entry note: ${entry.note}`;
                    }
                }
                alert(entryString);
            }
        },
        {
            type: "hrow",
            text: "Desktop Notifications"
        },
        {
            type: "link",
            text: "Check Notification Permission",
            action: () => {
                if (Notification.permission === "granted") {
                    alert("Notification permission granted.");
                } else if (Notification.permission === "denied") {
                    alert("Notification permission denied.");
                } else {
                    alert("Notification permission not requested yet.");
                }
            }
        },
        {
            type: "link",
            text: "Request Notification Permission",
            action: () => {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        alert("Notification permission granted.");
                    } else {
                        alert("Notification permission denied.");
                    }
                });
            }
        },
        {
            type: "link",
            text: "Send Test Notification",
            action: () => {
                if (Notification.permission === "granted") {
                    if (!settings.get("desktopNotifications.enabled")) {
                        alert("Desktop notifications are disabled in settings.");
                    } else {
                        new Notification("Test Notification", {
                            body: "This is a test notification.",
                            icon: "/favicon.png"
                        });
                    }
                } else {
                    alert("Notification permission not granted.");
                }
            }
        },
        {
            type: "hrow",
            text: "Settings"
        },
        {
            type: "link",
            text: "Toggle Notifications",
            action: () => {
                settings.toggle("desktopNotifications.enabled");
            }
        }
    ];
</script>
<div class="background">
</div>

<div class="window">
    <h1>How are you feeling right now?</h1>
    <Logger bind:this={compLogger} />
    <button class="btn" onclick={event => { contextMenu.open(event, devMenuItems) }}>
        <p>Developer menu</p>
    </button>
</div>
<ContextMenu />
<Service />