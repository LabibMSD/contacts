import { ValidationError } from "../../src/errors.js";
import getContact from "../../src/features/getContact.js";

export default async function handler ({key}) {
    try {
        await getContact(key);
    } catch (err) {
        if (err instanceof ValidationError) console.error(err.message);
        else console.error("Terjadi kesalahan:", err);
    }
}