import { ValidationError } from "../../src/errors.js";
import { fs, path } from "../../src/config.js";
import pushData from "./pushData.js";

export default async function() {
    try {
        try {
            await fs.stat(path);
        } catch {
            await pushData([]);
            console.log(`File '${path}' berhasil dibuat.`);
        }
    } catch (err) {
        if (err instanceof ValidationError) throw new ValidationError(`Membuat file: ${err.message}`);
        else throw err;
    }
}