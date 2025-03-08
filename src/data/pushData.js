import { ValidationError } from "../../src/errors.js";
import { fs, validator, path } from "../../src/config.js";

export default async function(value) {
    try {
        if (typeof value !== "object") throw new ValidationError(`Value tidak valid`);
        value.find(contact => {
            const keys = Object.keys(contact);
            if (keys.length < 3) throw new ValidationError(`Value tidak valid`);
            if (!validator.equals(keys[0], "nama") || !validator.equals(keys[1], "email") || !validator.equals(keys[2], "noHP")) throw new ValidationError(`Value tidak valid`);
        })
        const data = JSON.stringify(value, null, 4);
        await fs.writeFile(path, data);
    } catch (err) {
        if (err instanceof ValidationError) throw new ValidationError(`Gagal memasukkan data: ${err.message}`);
        else throw err;
    }
}