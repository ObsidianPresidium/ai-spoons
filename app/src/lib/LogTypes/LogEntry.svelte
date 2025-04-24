<style lang="scss">
    .sliders {
        display: grid;
        grid-template-columns: repeat(1, 11rem 1fr);
        width: 100%;
        p {
            white-space: nowrap;
        }
    }
</style>

<script lang="ts">
    import LogGeneric from "./LogGeneric.svelte";
    import Button from "$lib/Button.svelte";
    import Slider from "$lib/Slider.svelte";

    let { buttonHeight, log, elaborate, submit, startOver, getCurrentEntry } = $props();
    let detailedEnergy = $state(getCurrentEntry().basicMood.energy);
    let detailedHappiness = $state(getCurrentEntry().basicMood.happiness);
</script>

<LogGeneric>
    <Button text="Write a note" height={buttonHeight} href={() => elaborate("note")} />
    <div class="sliders">
        <p>My energy is a{(detailedEnergy % 10 === 8) ? "n":""} {detailedEnergy}</p>
        <Slider
            min={1}
            max={10}
            step={1}
            bind:value={detailedEnergy}
            onChange={log({ basicMood: { energy: detailedEnergy, happiness: detailedHappiness, oneclick: false } })} />
        <p>My happiness is a{(detailedHappiness % 10 === 8) ? "n":""} {detailedHappiness}</p>
        <Slider
            min={1}
            max={10}
            step={1}
            bind:value={detailedHappiness}
            onChange={log({ basicMood: { energy: detailedEnergy, happiness: detailedHappiness, oneclick: false } })} />
    </div>
    <hr>
    <Button text="Log this entry" height={buttonHeight} href={submit} />
    <Button text="Start over" height={buttonHeight} href={startOver} />
</LogGeneric>