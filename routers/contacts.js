import { express } from "../configs/config.js";
import { addContacts, editContact, deleteContact, listContacts } from "../controllers/contacts.js";
import validateContact from "../middlewares/contacts.js";

const router = express.Router();

router.get('/', listContacts);
router.post("/", validateContact, addContacts);
router.put("/:id", validateContact, editContact);
router.delete('/:id', deleteContact);

export default router;