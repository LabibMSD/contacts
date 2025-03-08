import { ValidationError } from "../../src/errors.js";
import editContact from "../../src/features/editContact.js";

export default async function ({key, attribute, value}) {
    try {
        await editContact(key, attribute, value);
    } catch (err) {
        if (err instanceof ValidationError) console.error(err.message);
        else console.error("Terjadi kesalahan:", err);
    }
}