import builder from "./builder.js";
import handler from "./handler.js";

export default {
    command: "edit", 
    desc: "Mengedit contact berdasarkan key",
    builder,
    handler
}