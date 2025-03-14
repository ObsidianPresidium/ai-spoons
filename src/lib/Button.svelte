<style lang="scss">
    .btn {
        background-image: linear-gradient(135deg, rgba(17,24,39,1) 0%, rgba(55,65,81,1) 35%, rgba(0,0,0,1) 100%);
        color: white;
        padding: 1rem 2rem;
        font-family: "Inter", sans-serif;
        font-weight: bold;
        font-size: 1.5rem;
        background-size: 400% 100%;
        background-position-x: 0%;
        border: 2px solid white;
        border-radius: .5rem;

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
        width?: string | undefined
    }
    
    let { text, href = undefined, disabled = false, width = undefined } : Props = $props();

    const useAnchorElement = typeof href === "string";

    onMount(() => {
        if (width) elButton.style.width = width;
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