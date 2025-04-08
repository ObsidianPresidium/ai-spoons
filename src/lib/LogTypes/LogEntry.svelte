<script lang="ts">
    import LogGeneric from "./LogGeneric.svelte";
    import Button from "$lib/Button.svelte";

    let { buttonHeight, log, elaborate, submit, startOver } = $props();
</script>

<LogGeneric>
    <Button text="Write a note" height={buttonHeight} href={() => elaborate("note")} />
    <hr>
    <Button text="Log this entry" height={buttonHeight} href={submit} />
    <Button text="Start over" height={buttonHeight} href={startOver} />
</LogGeneric>