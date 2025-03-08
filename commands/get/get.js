import builder from "./builder.js";
import handler from "./handler.js";

export default {
    command: "get", 
    desc: "Mengambil contact berdasarkan key",
    builder,
    handler
}