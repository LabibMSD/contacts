import builder from "./builder.js";
import handler from "./handler.js";

export default {
    command: "remove", 
    desc: "Menghapus contact berdasarkan key",
    builder,
    handler
}