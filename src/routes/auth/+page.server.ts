import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
    signup: async ({ request, locals: { supabase } }) => {
        // TODO: Enable signups when the app is ready
        // const formData = await request.formData()
        // const email = formData.get('email') as string
        // const password = formData.get('password') as string

        // const { error } = await supabase.auth.signUp({ email, password })
        // if (error) {
        //     console.error(error)
        //     redirect(303, '/auth/error')
        // } else {
        //     redirect(303, '/')
        // }
        redirect(303, "/auth/signups-disabled");
    },
    login: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            redirect(303, '/')
        }
    },
}