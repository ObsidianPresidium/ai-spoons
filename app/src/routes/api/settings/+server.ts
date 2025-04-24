import type { RequestHandler } from '../$types';
import { db } from "$lib/server";
import { json } from '@sveltejs/kit';


export const GET: RequestHandler = async () => {
    return json(db.user.settings);
};

export const POST: RequestHandler = async ({request}) => {
    const { settings } = await request.json();
    if (settings) {
        db.user.settings = { ...db.user.settings, ...settings };
        db.saveUserFile();
    }
    return json(db.user.settings);
};