import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    CheckSquare,
    FolderKanban,
    CalendarDays,
    NotebookPen
} from "lucide-react";

import styles from "./Sidebar.module.css";

function Sidebar() {

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
</nav>
    </aside>
  );
}

export default Sidebar;