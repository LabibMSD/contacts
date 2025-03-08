import { ValidationError } from "../../src/errors.js";
import { validator } from "../../src/config.js";
import getData from "../data/getData.js";
import pushData from "../data/pushData.js";

export default async function(nama, email, noHP) {
    try {
        if (typeof nama !== "string" || validator.isEmpty(nama)) throw new ValidationError(`Nama tidak valid`);
        if (typeof email !== "string" || validator.isEmpty(email) || !validator.isEmail(email)) throw new ValidationError(`Email tidak valid`);
        if (typeof noHP !== "string" || validator.isEmpty(noHP) || !validator.isMobilePhone(noHP)) throw new ValidationError(`No HP tidak valid`);

        const contacts = await getData();
        contacts.push({nama, email, noHP});

        await pushData(contacts);
        console.log("Data berhasil ditambahkan");
    } catch (err) {
        if (err instanceof ValidationError) console.error(`Gagal menambahkan contact: ${err.message}`);
        else throw err;
    }
}