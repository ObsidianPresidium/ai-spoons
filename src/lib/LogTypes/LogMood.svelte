<script lang="ts">
    import LogGeneric from "./LogGeneric.svelte";
    import Button from "$lib/Button.svelte";

    let { buttonHeight, log, elaborate, submit, startOver } = $props();
</script>

<LogGeneric>
    <Button text="Feeling good, energetic" height={buttonHeight} href={() => {log({basicMood: "energetic happy"})}} />
    <Button text="Feeling bad, energetic" height={buttonHeight} href={() => {log({basicMood: "energetic sad"})}} />
    <Button text="Feeling good, exhausted" height={buttonHeight} href={() => {log({basicMood: "tired happy"})}} />
    <Button text="Feeling bad, exhausted" height={buttonHeight} href={() => {log({basicMood: "tired sad"})}} />
</LogGeneric>