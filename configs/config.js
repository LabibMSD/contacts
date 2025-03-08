import fileSystem from "node:fs/promises";
export const fs = fileSystem;

import readline from "readline/promises";
export const rl = readline.createInterface(process.stdin, process.stdout);

import validators from "validator";
export const validator = validators;

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
export const argv = yargs(hideBin(process.argv));

import path from "node:path";
export const viewsRoot = path.join(import.meta.dirname, "../views");
export const publicRoot = path.join(import.meta.dirname, "../public");

import express from "express";
import expressLayout from "express-ejs-layouts";
export const app = express();
export { express, expressLayout };

import cookieParser from "cookie-parser";
export { cookieParser }

import methodOverride from "method-override";
export { methodOverride }

import morgan from "morgan";
export { morgan }

export const host = "localhost";
export const port = 3000;
export const url = `${host}:${port}`;

export const directory = "database";
export const file = "contacts.json";
export const database = `${directory}/${file}`;

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export const handleError = (message, err) => {
    if (err instanceof ValidationError) throw new ValidationError(`${message}: ${err.message}`);
    else throw err;
}