import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server";

export const actions: Actions = {
    default: async ({request}) => {
        const formData = await request.formData();
        const entryString = formData.get("entry");
        let entry;
        try {
            entry = JSON.parse(entryString as string);
        } catch {
            entry = {};
        }

        db.addEntry(entry);
        db.saveUserFile();
        redirect(303, "/log/logged");
    }
}