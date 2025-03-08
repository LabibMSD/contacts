import { ValidationError } from "../../src/errors.js";
import typeChar from "./typeChar.js";

export default async function typeText(array, index=0) {
    try {
        if (!array || array.length === 0) throw new ValidationError(`Array tidak valid`);
        if (index >= array.length) return;
    
        await new Promise((resolve, reject) => {
            typeChar(array[index], 0, (err) => {
                if (err) {
                    if (err instanceof ValidationError) reject(new ValidationError(`Gagal menulis char: ${err.message}`));
                    else reject(err);
                }
                else resolve();
            });
        });

        await typeText(array, index + 1)
    } catch (err) {
        if (err instanceof ValidationError) throw new ValidationError(`Gagal menulis teks: ${err.message}`);
        else throw err;
    }
}