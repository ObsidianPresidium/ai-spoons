<script lang="ts">
    let { data } = $props();
</script>

<ul>
    {#each data.instruments as country}
        <li>{country.name}</li>
    {/each}
</ul>