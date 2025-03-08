import { validateContact } from "../models/contacts.js";

export default (req, res, next) => {
    try {
        const {nama, email, noHP} = req.body;
        validateContact(nama, email, noHP);
        next();
    } catch (err) { 
        const method = req.method.toLowerCase();
        const methods = {
            "get": "mengambil",
            "post": "menambah",
            "put": "mengubah",
            "delete": "menghapus"
        }
        res.cookie("err", `Gagal ${methods[method]} contact: ${err.message}`).redirect("/contacts");
    }
}