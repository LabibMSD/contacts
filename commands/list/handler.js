import { ValidationError } from "../../src/errors.js";
import readContact from "../../src/features/listContacts.js";

export default async function handler () {
    try {
        await readContact();
    } catch (err) {
        if (err instanceof ValidationError) console.error(err.message);
        else console.error("Terjadi kesalahan:", err);
    }
}