import { ValidationError } from "../../src/errors.js";
import { fs, validator, path } from "../../src/config.js";

export default async function(value) {
    try {
        let data = await fs.readFile(path, 'utf-8');
        if (validator.isEmpty(data)) throw new ValidationError(`Database tidak valid`);
        
        data = JSON.parse(data);
        if (!Array.isArray(data)) throw new ValidationError(`Database tidak valid`);

        data.forEach(contact => {
            const keys = Object.keys(contact);
            if (keys.length !== 3) throw new ValidationError(`Database tidak valid`);
            if (!validator.equals(keys[0], "nama") || !validator.equals(keys[1], "email") || !validator.equals(keys[2], "noHP")) throw new ValidationError(`Database tidak valid`);
        })
        
        if (!value) return data;
        
        if (typeof value !== "string" || validator.isEmpty(value)) throw new ValidationError(`Key tidak valid`);
        if (data.length === 0) throw new ValidationError("Database kosong");

        const index = data.findIndex(({nama, email, noHP}) => (validator.equals(nama, value) || validator.equals(email, value) || validator.equals(noHP, value)));
        if (index < 0) throw new ValidationError(`Key '${value}' tidak ditemukan`);

        return {contact: [data[index]], index};
    } catch (err) {
        if (err instanceof ValidationError) throw new ValidationError(`Gagal mengambil data: ${err.message}`);
        else throw err;
    }
}