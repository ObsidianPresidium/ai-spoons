<style lang="scss">
    .btn {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0.5rem;

        background-image: linear-gradient(135deg, rgba(17,24,39,1) 0%, rgba(55,65,81,1) 35%, rgba(0,0,0,1) 100%);
        color: white;
        font-family: "Inter", sans-serif;
        font-weight: bold;
        font-size: 1.4rem;
        background-size: 400% 100%;
        background-position-x: 0%;
        border: 2px solid white;
        border-radius: .5rem;

        width: 100%;
        height: 100%;

        transition: background-position-x 300ms cubic-bezier(0,0,0,1);
        position: relative;

        &:active {
            background-position-x: 100%;
        }
    }

    a {
        display: none;
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';

    let elButton: HTMLButtonElement;
    let elAnchor: HTMLAnchorElement;
    
    interface Props {
        text: string,
        href?: void | (() => void) | string,
        disabled?: boolean | undefined,
        width?: string | undefined,
        height?: string | undefined
    }
    
    let { text, href = undefined, disabled = false, width = undefined, height = undefined } : Props = $props();

    const useAnchorElement = typeof href === "string";

    onMount(() => {
        if (width) elButton.style.width = width;
        if (height) elButton.style.height = height;
        if (href) {
            if (useAnchorElement) {
                elAnchor.href = href as string;
                elButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    elAnchor.click();
                });
            } else {
                elButton.addEventListener("click", href as EventListener);
            }
        } else {
            elButton.type = "submit";
        }
    });
</script>

{#if useAnchorElement}
    <a bind:this={elAnchor} href="/">Anchor</a>
{/if}
<button class="btn" bind:this={elButton}>{text}</button>