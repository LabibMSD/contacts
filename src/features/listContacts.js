import { ValidationError } from "../../src/errors.js";
import getData from "../data/getData.js";
import typeText from "../utils/typeText.js";

export default async function() {
    try {
        const contacts = await getData();
        if (contacts.length === 0) throw new ValidationError(`Database kosong`);
        
        const contact = contacts.map(({nama, email, noHP}) => `\nNama: ${nama}\nEmail: ${email}\nNoHP: ${noHP}\n`);
        await typeText(contact);
    } catch (err) {
        if (err instanceof ValidationError) console.error(`Gagal membaca contact: ${err.message}`);
        else throw err;
    }
}