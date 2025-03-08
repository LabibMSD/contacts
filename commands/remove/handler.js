import { ValidationError } from "../../src/errors.js";
import removeContact from "../../src/features/removeContact.js";

export default async function handler ({key}) {
    try {
        await removeContact(key);
    } catch (err) {
        if (err instanceof ValidationError) console.error(err.message);
        else console.error("Terjadi kesalahan:", err);
    }
}