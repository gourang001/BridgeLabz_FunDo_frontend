import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState(""); 
    const [isCollapsed, setIsCollapsed] = useState(false); 

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className="dashboard-main">
            <Navbar setSearchQuery={setSearchQuery} toggleSidebar={toggleSidebar} />
            <div className="dashboard-center">
                <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <Outlet context={{ searchQuery }} /> 
            </div>
        </div>
    );
};

export default Dashboard;
