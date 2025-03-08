import { ValidationError } from "../../src/errors.js";
import addContact from "../../src/features/addContact.js";

export default async function handler ({nama, email, noHP}) {
    try {
        await addContact(nama, email, noHP);
    } catch (err) {
        if (err instanceof ValidationError) console.error(err.message);
        else console.error("Terjadi kesalahan:", err);
    }
}