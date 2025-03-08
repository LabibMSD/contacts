import { ValidationError } from "../../src/errors.js";
import { fs, directory } from "../../src/config.js";

export default async function() {
    try {
        await fs.mkdir(directory, { recursive: true });
        console.log(`\nDirectory '${directory}' siap digunakan.`);
    } catch (err) {
        if (err instanceof ValidationError) throw new ValidationError(`Membuat directory: ${err.message}`);
        else throw err;
    }
}