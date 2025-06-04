<style lang="scss">
    button {
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 2rem;
        background-color: #eef;
        border-radius: 50%;
        border: none;
        padding: 1rem;
        box-sizing: content-box;
        opacity: 0.33;
        transition: opacity 0.2s ease-in-out;
        width: 1.5rem;
        height: 1.5rem;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        
        svg {
            pointer-events: none;
            width: 100%;
            height: 100%;
        }

        &:hover {
            opacity: 1;
        }
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    let { data, children } = $props();
    let { supabase } = $derived(data);

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error)
        }
    }
    
    const checkSession = async () => {
        const { data, error } = await supabase.auth.getUser();
        console.log(data);
        console.log(error);
        if (!data.user) {
            alert("You are not logged in. Please log in to continue.");
        }
    };

    // onMount(checkSession);
</script>

<button on:click={logout} aria-label="Sign out"><svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="sign-out-2"
    data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line">
    <polyline id="primary" points="18 9 21 12 18 15"
        style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
    </polyline>
    <line id="primary-2" data-name="primary" x1="21" y1="12" x2="7" y2="12"
        style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
    </line>
    <path id="primary-3" data-name="primary"
        d="M14,16v3a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V5A1,1,0,0,1,4,4h9a1,1,0,0,1,1,1V8"
        style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
    </path>
</svg></button>
{@render children()}