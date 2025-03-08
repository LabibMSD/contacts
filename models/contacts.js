import { fs, directory, database, validator, ValidationError, handleError } from "../configs/config.js";

(async function() {
    try {
        await fs.mkdir(directory, { recursive: true });
        try {
            await fs.stat(database);
        } catch {
            await writeContacts([]);
        }
    } catch (err) {
        handleError("Gagal setup contact", err);
    }
})();

export function validateContact(nama, email, noHP) {
    if (typeof nama !== "string" || validator.isEmpty(nama)) throw new ValidationError(`Nama tidak valid`);
    if (typeof email !== "string" || (validator.isEmpty(email) || !validator.isEmail(email))) throw new ValidationError(`Email tidak valid`);
    if (typeof noHP !== "string" || (validator.isEmpty(noHP) || !validator.isMobilePhone(noHP))) throw new ValidationError(`No HP tidak valid`);
}

export async function getContacts() {
    try {
        let data = await fs.readFile(database, 'utf-8');
        data = JSON.parse(data);
        if (!Array.isArray(data)) throw new ValidationError(`Database tidak valid`);
        return data;
    } catch (err) {
        handleError("Gagal mengambil seluruh contacts", err);
    }
}

export async function getContactById(id) {
    try {
        let contacts = await getContacts();
        const contact = contacts.find((data) => data.id === id);
        return typeof contact === "undefined" ?  [] : contact;
    } catch (err) {
        handleError("Gagal mengambil contact dengan id", err);
    }
}

export async function getIndexContact(contact) {
    try {
        let contacts = await getContacts();
        const index = contacts.findIndex((data) => JSON.stringify(data) === JSON.stringify(contact));
        return index < 0 ? -1 : index;
    } catch (err) {
        handleError("Gagal mengambil id contact", err);
    }
}

export async function writeContacts(value) {
    try {
        if (typeof value !== "object") throw new ValidationError(`Value tidak valid`);

        const data = JSON.stringify(value, null, 4);
        await fs.writeFile(database, data);
    } catch (err) {
        handleError("Gagal menulis contacts", err);
    }
}

export async function createContact(nama, email, noHP) {
    try {
        validateContact(nama, email, noHP);
        
        let id = 1;
        const contacts = await getContacts();
        if (contacts.length !== 0) id = contacts[contacts.length -1].id + 1;
        contacts.push({id, nama, email, noHP});

        await writeContacts(contacts);
    } catch (err) {
        handleError("Gagal menambah contact", err);
    }
}

export async function updateContact(id, nama, email, noHP) {
    try {
        if (typeof parseInt(id) !== "number" || parseInt(id) < 1) throw new ValidationError("Id tidak valid");
        validateContact(nama, email, noHP)

        const contact = await getContactById(id), index = await getIndexContact(contact), contacts = await getContacts();
        if (contact.length === 0) throw new ValidationError("Id tidak ditemukan");
        contacts[index] = {id, nama, email, noHP};
        
        await writeContacts(contacts);
    } catch (err) {
        handleError("Gagal mengedit contact", err);
    }
}

export async function removeContact(id) {
    try {
        if (typeof parseInt(id) !== "number" || parseInt(id) < 1) throw new ValidationError("Id tidak valid");
        const contact = await getContactById(id), index = await getIndexContact(contact), contacts = await getContacts();
        if (contact.length === 0) throw new ValidationError("Id tidak ditemukan");
        contacts.splice(index, 1);

        await writeContacts(contacts);
    } catch (err) {
        handleError("Gagal menghapus contact", err);
    }
}