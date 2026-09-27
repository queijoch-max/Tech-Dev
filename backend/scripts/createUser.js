// ==============================
// SCRIPT : CRÉER UN UTILISATEUR
// Usage : npm run create-user -- email@exemple.com motdepasse
// ==============================

import db from "../src/database/database.js";
import { createUser, getUserByEmail } from "../src/services/userService.js";

const [email, password] = process.argv.slice(2);

if (!email || !password) {
    console.error("Usage : npm run create-user -- email@exemple.com motdepasse");
    process.exit(1);
}

if (await getUserByEmail(email)) {
    console.error(`L'utilisateur ${email} existe déjà.`);
} else {
    const id = await createUser(email, password);
    console.log(`Utilisateur ${email} créé (id ${id}).`);
}

await db.end();
