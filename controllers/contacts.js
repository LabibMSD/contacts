import { getContacts, createContact, updateContact, removeContact, getContactById } from "../models/contacts.js";

export const listContacts = async (req, res, next) => {
    try {
        let contacts = await getContacts();
        const id = parseInt(req.query.id);
        if (id >= 0 || id < 0) {
            contacts = await getContactById(id);
            if (contacts.length <= 0) return res.cookie("err", "Id tidak valid").redirect("/contacts");
        }

        res.clearCookie("err").clearCookie("success").render("contacts", {
            layout: "layouts/layout",
            title: "Contacts",
            contacts,
            err: req.cookies.err,
            success: req.cookies.success
        });
    } catch (err) {
        next(err)
    }
}

export const addContacts = async (req, res, next) => {
    try {
        const { nama, email, noHP } = req.body;
        await createContact(nama, email, noHP);

        res.cookie("success", `Berhasil add kontak`).redirect(303, "/contacts");
    } catch (err) {
        next(err);
    }
}

export const editContact = async (req, res, next) => {
    try {
        const { id } = req.params, { nama, email, noHP } = req.body;
        await updateContact(parseInt(id), nama, email, noHP);

        res.cookie("success", `Berhasil update kontak`).redirect(303, "/contacts");
    } catch (err) {
        next(err);
    }
}

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        await removeContact(parseInt(id));

        res.cookie("success", `Berhasil hapus kontak`).redirect(303, "/contacts");
    } catch (err) {
        next(err);
    }
}