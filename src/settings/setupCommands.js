import { ValidationError } from "../../src/errors.js";
import { argv } from "../../src/config.js";
import commands from "../../commands/commands.js";

export default async function() {
    try {
        commands.forEach(cmd => {
            if (!cmd) throw new ValidationError(`Command tidak valid`);
            argv.command(cmd)
        });
        await argv.demandCommand(1, "Minimal masukkan 1 command untuk menjalankan").parse();
    } catch (err) {
        if (err instanceof ValidationError) console.error(`Gagal setup command: ${err.message}`);
        else throw err;
    }
}