import { rl } from "./src/config.js";

import setupCommands from "./src/settings/setupCommands.js";
import setupContacts from "./src/settings/setupContacts.js";

try {
    await setupContacts();
    await setupCommands();
} catch (err) {
    console.error("Fatal error:", err);
} finally {
    rl.close();
}