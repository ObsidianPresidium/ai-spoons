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

        transition: background-position-x 300ms cubic-bezier(0,0,0,1);
        position: relative;

        &:active {
            background-position-x: 100%;
        }
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';

    let elButton: HTMLButtonElement;
    
    interface Props {
        text: string,
        href?: void | undefined,
        disabled: boolean
    }
    
    let { text, href = undefined, disabled = false} : Props = $props();

    onMount(() => {
        if (href) {
            elButton.addEventListener("click", href as EventListener);
        } else {
            elButton.type = "submit";
        }
    });
</script>

<button class="btn" bind:this={elButton}>{text}</button>