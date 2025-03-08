import { ValidationError } from "../../src/errors.js";
import makeDirectory from "../data/makeDirectory.js";
import makeFile from "../data/makeFile.js";

export default async function() {
    try {
        await makeDirectory();
        await makeFile();
    } catch (err) {
        if (err instanceof ValidationError) throw new ValidationError(`Gagal setup contact: ${err.message}`);
        else throw err;
    }
}