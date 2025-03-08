import { ValidationError } from "../../src/errors.js";
import { validator, rl } from "../../src/config.js";

export default function typeChar(string, index=0, callback) {
    try {
        if (typeof string !== "string" || validator.isEmpty(string)) throw new ValidationError("String tidak valid");
        if (index >= string.length) {
            rl.write("\n");
            return callback();
        }

        setTimeout(() => {
            try {
                rl.write(string[index]);
                typeChar(string, index + 1, callback);
            } catch (err) {
                callback(err);
            }
        }, 10);
    } catch (err) {
        if (err instanceof ValidationError) throw new ValidationError(`Gagal menulis char: ${err.message}`);
        else throw err;
    }
}