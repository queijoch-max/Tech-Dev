import db from "../database/database.js";
import bcrypt from "bcrypt";

const getAllUsers = () => {
    const users = db.prepare("SELECT * FROM users").all();
    return users;
}

const createUser = (email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = db.prepare(`
        INSERT INTO users (email, password) VALUES (?, ?)`).run(
            email,
            hashedPassword
        );
    return result.lastInsertRowid;
};

const getUserByEmail = (email) => {
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    return user;
};

export { getAllUsers, createUser, getUserByEmail };
