import type { RequestHandler } from '../$types';
import { db } from "$lib/server";


export const GET: RequestHandler = async () => {
    return new Response(JSON.stringify({entries: db.entries}), {
        headers: {
            "Content-Type": "application/json",
        }
    });
};