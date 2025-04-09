<style lang="scss">
    .slider {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
        input {
            appearance: none;
            width: 100%;
            height: 0.25rem;
            border-radius: 1rem;
            background-color: white;
            outline: none;
            border: none;
        }
        input::-webkit-slider-thumb, input::-moz-range-thumb {
            opacity: 0;
        }
    }
    .slider-thumb {
        position: fixed;
        left: 0;
        top: 0;
        pointer-events: none;
    }
    .slider-thumb, input::-webkit-slider-thumb, input::-moz-range-thumb {
        appearance: none;
        width: 1.5rem;
        height: 1.5rem;
        background-color: rgb(80, 156, 255);
        border: 1px solid white;
        box-shadow: 0 0 1rem rgb(80, 156, 255);
        border-radius: 50%;
        cursor: pointer;
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { ChangeEventHandler } from 'svelte/elements';
    let { text = "", min = 1, max = 10, step = 1, value = $bindable(), submittedName = "", onChange = () => {}, useConstantTracking = true } = $props();
    let sliderThumb: HTMLDivElement;
    let rangeInput: HTMLInputElement;
    let mouseX = 0;
    let mouseY = 0;

    onMount(() => {
        let displayedRange = rangeInput.clientWidth;
        let rangePosition = rangeInput.getBoundingClientRect();
        const refreshThumbPosition = () => {
            displayedRange = rangeInput.clientWidth;
            rangePosition = rangeInput.getBoundingClientRect();
        };
        const setAnimatorPositionInput = () => {
            const magicNumber = 0.995;
            sliderThumb.style.top = `${rangePosition.top - sliderThumb.clientHeight / 2}px`;
            sliderThumb.style.transform = `translateX(${((displayedRange - sliderThumb.clientWidth * 2) * ((value - min) / (max - min)) +  sliderThumb.clientWidth * ((value - min) / (max - min))) * magicNumber + rangePosition.left}px)`;
        }
        const correctPositions = setTimeout(refreshThumbPosition, 100);  // Give the browser time to render the DOM, then correct the position of thumb
        refreshThumbPosition();
        setAnimatorPositionInput();
        setTimeout(() => {
            sliderThumb.style.transition = "transform 200ms"
            sliderThumb.style.transitionTimingFunction = "cubic-bezier(0,1.21,.51,1.3)";
        }, 1);
        rangeInput.addEventListener("input", setAnimatorPositionInput);

        if (useConstantTracking) {
            let isDragging = false;
            rangeInput.removeEventListener("input", setAnimatorPositionInput);
            rangeInput.addEventListener("mousedown", (e) => {
                isDragging = true;
            });
            rangeInput.addEventListener("mouseup", (e) => {
                isDragging = false;
                setAnimatorPositionInput();
            });
            rangeInput.addEventListener("mousemove", (e) => {
                if (isDragging) {
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                    sliderThumb.style.transform = `translateX(${mouseX - sliderThumb.clientWidth / 2}px)`;
                }
            });
        }
    });
</script>

<div class="slider">
    {#if submittedName}
        {#if text}
            <label for="{submittedName}">{text}</label>
        {/if}
        <input bind:value bind:this={rangeInput} min={min} max={max} step={step} type="range" name="{submittedName}" onchange={onChange as ChangeEventHandler<HTMLInputElement>} />
    {:else}
        {#if text}
            <p>{text}</p>
        {/if}
        <input bind:value bind:this={rangeInput} min={min} max={max} step={step} type="range" onchange={onChange as ChangeEventHandler<HTMLInputElement>} />
    {/if}
</div>

<div class="slider-thumb" bind:this={sliderThumb}></div>