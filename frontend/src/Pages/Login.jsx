import styles from "../components/Login/Login.module.css";
import Login from "../components/Login/Login";

// ==============================
// PAGE : CONNEXION
// ==============================

function LoginPage() {
    return (
        <main className={styles.loginPage}>
            <Login />
        </main>
    );
}

export default LoginPage;
