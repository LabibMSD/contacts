import { express } from "../configs/config.js";
import { renderHome } from "../controllers/home.js";

const router = express.Router();

router.get('/', renderHome);
router.get('/home', renderHome);

export default router;