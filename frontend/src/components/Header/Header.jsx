import logo from "../../assets/logo-tech-dev.png";
import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <img
                src={logo}
                alt="Tech&Dev"
                className={styles.logo}
            />

            <div className={styles.brandText}>
                <h1>HUB DASHBOARD</h1>
                <p>Organisez. Développez. Avancez.</p>
            </div>
        </header>
    );
}

export default Header;