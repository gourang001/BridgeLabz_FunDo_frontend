import React from "react";
import "./Sidebar.scss";
import { Lightbulb, FolderDown, Trash2 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const sidebarItemsList = [
  {
    name: "Notes",
    icon: Lightbulb,
    path: "/dashboard/notes",
  },
  {
    name: "Archive",
    icon: FolderDown,
    path: "/dashboard/archive",
  },
  {
    name: "Trash",
    icon: Trash2,
    path: "/dashboard/trash",
  },
  {
    name: "Reminder",
    icon: Trash2,
    path: "/dashboard/reminder",
  },
];

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();

  // Close sidebar on route click for mobile screens
  const handleRouteClick = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar(); // Collapse sidebar on mobile
    }
  };

  return (
    <div className={`dashboard-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {sidebarItemsList.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <NavLink to={item.path} key={index} onClick={handleRouteClick}>
            <div className={`sidebar-column ${isActive ? "notes" : ""}`}>
              <IconComponent className="sidebar-icon" />
              <p className="sidebar-text">{item.name}</p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;