import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    CheckSquare,
    FolderKanban,
    CalendarDays,
    NotebookPen,
    LogOut
} from "lucide-react";

import styles from "./Sidebar.module.css";

function Sidebar() {

  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/"
    },
    {
      icon: <CheckSquare size={20} />,
      label: "Tâches",
      href: "/tasks"
    },
    {
      icon: <FolderKanban size={20} />,
      label: "Suivi de projets",
      href: "/projects"
    },
    {
      icon: <CalendarDays size={20} />,
      label: "Agenda",
      href: "/calendar"
    },
    {
      icon: <NotebookPen size={20} />,
      label: "Notes",
      href: "/notes"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className={styles.sidebar}>
    <nav>
    {menuItems.map((item, index) => (
        <NavLink
            key={index}
            to={item.href}
            className={({ isActive }) =>
                isActive ? styles.active : ""
            }
        >
            {item.icon}
            <span>{item.label}</span>
        </NavLink>
    ))}

    <button type="button" className={styles.logoutButton} onClick={handleLogout}>
        <LogOut size={20} />
        <span>Déconnexion</span>
    </button>
</nav>
    </aside>
  );
}

export default Sidebar;
