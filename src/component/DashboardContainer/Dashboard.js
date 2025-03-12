import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState(""); // Add search query state

    return (
        <div className="dashboard-main">
            <Navbar setSearchQuery={setSearchQuery} />
            <div className="dashboard-center">
                <Sidebar />
                <Outlet context={{ searchQuery }} /> {/* Pass searchQuery using Outlet Context */}
            </div>
        </div>
    );
};

export default Dashboard;
