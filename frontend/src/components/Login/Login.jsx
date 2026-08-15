import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { API_URL } from "../../config";
import logo from "../../assets/logo-tech-dev.png";

// ==============================
// COMPOSANT : CONNEXION
// ==============================

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // ==============================
    // CONNEXION
    // ==============================

    const handleLogin = async () => {
        setError("");

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Erreur de connexion");
                return;
            }

            localStorage.setItem("token", data.token);
            navigate("/");

        } catch (err) {
            console.error("Erreur réseau lors de la connexion :", err);
            setError("Impossible de contacter le serveur");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleLogin();
        }
    };

    // ==============================
    // AFFICHAGE
    // ==============================

    return (
        <div className={styles.loginCard}>

            <img src={logo} alt="Tech&Dev" className={styles.logo} />

            <h1 className={styles.title}>HUB DASHBOARD</h1>
            <p className={styles.subtitle}>Connexion</p>

            <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Email"
                autoFocus
            />

            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Mot de passe"
            />

            {error && <p className={styles.error}>{error}</p>}

            <button type="button" onClick={handleLogin}>
                Se connecter
            </button>

        </div>
    );
}

export default Login;
