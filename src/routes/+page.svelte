<style lang="scss">
    p, h1, h2 {
        color: black;
    }
</style>

<script lang="ts">
    let { data } = $props();
    let { session, supabase } = $derived(data);

    let pleaseLogInText = $state("Checking log in status...");
    let logInLink = $state("Log in here");

    const checkSession = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (data.user) {
            pleaseLogInText = "You are logged in.";
            logInLink = "";
        } else {
            pleaseLogInText = "You're not logged in. Make sure you're logged in first, before trying to use the app.";
            logInLink = "Log in here";
        }
    };

    checkSession();
</script>

<h1>AI Spoons</h1>
<p>{pleaseLogInText} <a href="auth">{logInLink}</a></p>
<h2>App Scenes</h2>
<p>
    <a href="/app/log">Logger</a><br />
    <a href="/app/calendar">Calendar</a>
</p>