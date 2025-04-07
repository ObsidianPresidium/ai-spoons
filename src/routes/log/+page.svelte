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
                const mood: BasicMood = "energetic happy";
                const entry = {
                    privacy: false,
                    note: "This is a test entry.",
                    basicMood: mood,
                    date: new Date().getTime(),
                };
                console.log(`Submitting test entry ${entry} to server...`);
                prompt();
                compLogger.forceSubmit(entry);
            }
        },
        {
            type: "link",
            text: "Retrieve Stored Entry",
            action: async () => {
                const response = await fetch("/api/entry");
                const data = await response.json();
                let entryString = `Entries stored: ${data.entries.length}\n`
                + `Latest entry: ${new Date(data.entries[data.entries.length - 1].date).toUTCString()}\n`
                + `Latest entry mood: ${data.entries[data.entries.length - 1].basicMood}\n`;
                alert(entryString);
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