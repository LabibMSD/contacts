import fileSystem from "node:fs/promises";
import readline from "readline/promises";
import validators from "validator";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";


export const fs = fileSystem;
export const rl = readline.createInterface(process.stdin, process.stdout);
export const validator = validators;

export const argv = yargs(hideBin(process.argv));

export const directory = "database";
export const file = "contacts.json";
export const path = `${directory}/${file}`;