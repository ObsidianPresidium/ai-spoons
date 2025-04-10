<style lang="scss">
    .window {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        opacity: 0;
        z-index: 998;
    }
    .menu {
        position: fixed;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        z-index: 999;
        background-color: black;

        box-shadow: 0 0 2rem #fff8;
    }

    .hidden {
        display: none !important;
    }

    .item {
        $item: &;
        display: flex;
        justify-content: left;
        align-items: center;
        cursor: default;

        width: 100%;
        height: 1rem;
        box-sizing: border-box;

        transition: background-color 200ms;

        &:not(:has(hr)) {
            padding: 1rem 0.5rem;
        }

        &:has(hr):has(.title) {
            padding-left: 0.5rem;

            .title {
                margin-right: 0.5rem;
            }
        }

        &:first-child:not(:has(hr)) {
            border-radius: 0.5rem 0.5rem 0 0;
        }

        &:not(:has(hr)):not(:has(.title)):hover {
            background-color: #6c6caf;
        }

        &:last-child:not(:has(hr)) {
            border-radius: 0 0 0.5rem 0.5rem;
        }

        p {
            font-family: "Inter", sans-serif;
            font-weight: bold;
            font-size: 1rem;
            text-align: left;
            white-space: nowrap;
        }

        .title {
            color: grey;
        }

        .text {
            color: white;
        }

        hr {
            width: calc(100% - 0.5rem);
            height: 0.1rem;
            background-color: grey;
            border: none;
            margin: 0 auto;
            padding: 0;
        }
    }
</style>

<script lang="ts">
    import { contextMenu, contextMenuState } from "$lib/contextMenuLogic";
    import { onDestroy } from "svelte";
    import { onMount } from "svelte";

    let menu: HTMLDivElement;
    let window: HTMLDivElement;
    let items = $state(contextMenu.getItems());
    let doAction: (action: () => void) => void;

    onMount(() => {
        doAction = (action: () => void | undefined) => {
            if (!action) return;
            action();
            contextMenu.close();
        }
        const destroySubscription = contextMenuState.subscribe(() => {
            if (contextMenu.isOpen) {
                items = contextMenu.getItems();
                menu.style.left = contextMenu.x + "px";
                menu.style.top = contextMenu.y + "px";
                window.classList.remove("hidden");
                menu.classList.remove("hidden");
            } else {
                window.classList.add("hidden");
                menu.classList.add("hidden");
            }
        });

        onDestroy(destroySubscription);
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="window" bind:this={window} onclick={() => contextMenu.close()}>
</div>
<div class="menu hidden" bind:this={menu}>
    {#each items as item}
        <div class="item" onclick={() => doAction(item.action)}>
            {#if item.type === "hrow"}
                {#if item.text !== ""}
                    <p class="title">{item.text}</p>
                #{/if}
                <hr />
            {:else if item.type === "title"}
                <p class="title">{item.text}</p>
            {:else if item.type === "link"}
                <p class="text">{item.text}</p>
            {/if}
        </div>
    {/each}
</div>