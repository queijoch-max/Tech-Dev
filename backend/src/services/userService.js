import db from "../database/database.js";
import bcrypt from "bcrypt";

const getAllUsers = async () => {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
};

const createUser = async (email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = await db.query(
        `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`,
        [email, hashedPassword]
    );
    return result.rows[0].id;
};

const getUserByEmail = async (email) => {
    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0];
};

export { getAllUsers, createUser, getUserByEmail };
