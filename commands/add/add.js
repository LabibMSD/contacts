import builder from "./builder.js";
import handler from "./handler.js";

export default {
    command: "add", 
    desc: "Menambah contact pada contacts",
    builder,
    handler
}