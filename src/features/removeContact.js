import { ValidationError } from "../../src/errors.js";
import getData from "../data/getData.js";
import pushData from "../data/pushData.js";

export default async function(key) {
    try {
        const {contact, index} = await getData(key);
        contact.splice(index, 1);
        await pushData(contact);

        console.log(`Berhasil menghapus, key '${key}'`);
    } catch (err) {
        if (err instanceof ValidationError) console.error(`Gagal menghapus contact: ${err.message}`);
        else throw err;
    }
}