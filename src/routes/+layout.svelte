<script lang="ts">
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'

    let { data, children } = $props()
    let { session, supabase } = $derived(data)

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((_: any, newSession: any) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            }
        })

        return () => data.subscription.unsubscribe()
    })
</script>

{@render children()}