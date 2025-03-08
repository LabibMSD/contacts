import { ValidationError } from "../../src/errors.js";
import { validator } from "../../src/config.js";
import getData from "../data/getData.js";
import pushData from "../data/pushData.js";

export default async function(key, attribute, value) {
    try {
        if (!validator.equals(attribute, "nama") && !validator.equals(attribute, "email") && !validator.equals(attribute, "noHP")) throw new ValidationError("Attribute tidak valid");
        if (validator.equals(attribute, "nama") && validator.isEmpty(value)) throw new ValidationError(`Nama tidak valid`);
        if (validator.equals(attribute, "email") && (validator.isEmpty(value) || !validator.isEmail(value))) throw new ValidationError(`Email tidak valid`);
        if (validator.equals(attribute, "noHP") && (validator.isEmpty(value) || !validator.isMobilePhone(value))) throw new ValidationError(`No HP tidak valid`);

        const {contact, index} = await getData(key), contacts = await getData();
        contacts[index][attribute] = value;
        await pushData(contacts);

        console.log(`Berhasil mengedit, key '${key}', attribute '${attribute}' from '${contact[0][attribute]}' to '${value}'`);
    } catch (err) {
        if (err instanceof ValidationError) console.error(`Gagal mengedit contact: ${err.message}`);
        else throw err;
    }
}