import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server";

export const actions: Actions = {
    default: async ({request, cookies}) => {
        const formData = await request.formData();
        const entryString = formData.get("entry");
        let entry;
        try {
            entry = JSON.parse(entryString as string);
            db.addEntry(entry);
            db.saveUserFile();
        } catch {
            console.error("Failed to parse entry:", entryString, ", entry not added.");
        }

        redirect(303, "/log/logged");
    }
}