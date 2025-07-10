<style lang="scss">
    @use "pkg:@fontsource/inter";
    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        padding: 0.5rem 1rem;
        color: white;
        font-family: "Inter", sans-serif;
        font-weight: bold;
        font-size: 1rem;
        
        border: none;

        width: 100%;
        height: 100%;

        position: relative;
    }

    .btn-container {
        background-color: #007aff;
        overflow: hidden;
        position: relative;
        border-radius: .75rem;
        transition: transform 100ms;
        &:hover .light {
            opacity: 0.6;
        }
        &:active {
            transform: scale(0.95);
        }
    }

    .light {
        width: 0;
        height: 0;
        left: 0;
        top: 0;
        position: absolute;
        box-shadow: 0 0 4rem 2rem white;
        opacity: 0;
        transition: opacity 200ms;
    }

    a {
        display: none;
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';

    let elButton: HTMLButtonElement;
    let elContainer: HTMLDivElement;
    let elLight: HTMLDivElement;
    
    interface Props {
        text: string,
        color?: string,
        href?: void | (() => void) | string,
        disabled?: boolean | undefined,
        width?: string | undefined,
        height?: string | undefined
    }
    
    let { text, color = "#007aff", href = undefined, disabled = false, width = undefined, height = undefined } : Props = $props();

    const useAnchorElement = typeof href === "string";

    onMount(() => {
        if (width) elButton.style.width = width;
        if (height) elButton.style.height = height;
        if (href) {
            elButton.addEventListener("click", href as EventListener);
        } else {
            elButton.type = "submit";
        }
        
        elContainer.style.backgroundColor = color;
        elContainer.addEventListener("mousemove", (e) => {
            elLight.style.transform = `translate(calc(${e.offsetX}px - 50%), calc(${e.offsetY}px - 50%))`;
            console.log("test");
        });
    });
</script>

<!-- Old code
{#if useAnchorElement}
    <a bind:this={elAnchor} href="/">Anchor</a>
{/if}
<button class="btn" bind:this={elButton}>{text}</button>
-->

<div class="btn-container" bind:this={elContainer}>
    <div class="light" bind:this={elLight}>&nbsp;</div>
    <button class="btn" bind:this={elButton}>{text}</button>
</div>