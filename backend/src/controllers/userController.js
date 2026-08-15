import {
    getAllUsers,
    getUserByEmail as getUserByEmailService,
    createUser as createUserService
} from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const getUsers = async (req, res) => {
    const users = await getAllUsers();

    res.json({
        message: "Liste des utilisateurs",
        users: users
    });
};

const createUser = async (req, res) => {
    const { email, password } = req.body;

    const userId = await createUserService(
        email,
        password
    );

    res.status(201).json({
        message: "Utilisateur ajouté avec succès",
        userId: userId
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmailService(email);

    if (!user) {
        res.status(401).json({
            message: "Utilisateur introuvable"
        });
        return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        res.status(401).json({
            message: "Mot de passe incorrect"
        });
        return;
    }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({
        message: "Authentification réussie",
        user: { id: user.id, email: user.email },
        token: token
    });
};

export {
    getUsers,
    createUser,
    loginUser
};