import { ValidationError } from "../../src/errors.js";
import getData from "../data/getData.js"
import typeText from "../utils/typeText.js";

export default async function (key) {
    try {
        const {contact} = await getData(key);
        const data = contact.map(({nama, email, noHP}) => `\nNama: ${nama}\nEmail: ${email}\nNoHP: ${noHP}\n`);
        await typeText(data);
    } catch (err) {
        if (err instanceof ValidationError) console.error(`Gagal membaca contact: ${err.message}`);
        else throw err;
    }
}