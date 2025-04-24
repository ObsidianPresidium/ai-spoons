<script lang="ts">
    import { settings } from "$lib/settings";
    import { onDestroy, onMount } from "svelte";

    onMount(() => {
        const status = settings.service();
    
        if (status === "service registered") {
            onDestroy(() => {
                settings.destroyService();
            });
        }
    });
</script>