<script lang="ts">
    import LogGeneric from "./LogGeneric.svelte";
    import Button from "$lib/Button.svelte";

    let { buttonHeight, log, elaborate, submit, startOver, getCurrentEntry } = $props();
</script>

<LogGeneric>
    <Button text="Feeling good, energetic" height={buttonHeight} href={() => {log({basicMood: {energy: 8, happiness: 8, oneclick: true}})}} />
    <Button text="Feeling bad, energetic" height={buttonHeight} href={() => {log({basicMood: {energy: 8, happiness: 2, oneclick: true}})}} />
    <Button text="Feeling good, exhausted" height={buttonHeight} href={() => {log({basicMood: {energy: 2, happiness: 8, oneclick: true}})}} />
    <Button text="Feeling bad, exhausted" height={buttonHeight} href={() => {log({basicMood: {energy: 2, happiness: 2, oneclick: true}})}} />
</LogGeneric>