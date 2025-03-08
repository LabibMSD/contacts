import { rl } from "../src/config.js";

export default function(value) {
    return rl.question(value);
}