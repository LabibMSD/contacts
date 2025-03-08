import { ValidationError } from "../configs/config.js";

export default (err, req, res, next) => {
    console.error(err);

    res.status(500).render("error", {
        layout: "layouts/layout",
        title: "Error",
        message: err instanceof ValidationError ? err.message : "Kesalahan fatal"
    });
}