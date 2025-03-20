import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState(""); // Search bar input
    const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar toggle state

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className="dashboard-main">
            <Navbar setSearchQuery={setSearchQuery} toggleSidebar={toggleSidebar} />
            <div className="dashboard-center">
                <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <Outlet context={{ searchQuery }} /> {/* For passing search input down */}
            </div>
        </div>
    );
};

export default Dashboard;

// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import "./Dashboard.scss";
// import Navbar from "../Navbar/Navbar";
// import Sidebar from "../Sidebar/Sidebar";

// const Dashboard = () => {
//     const [searchQuery, setSearchQuery] = useState(""); // Add search query state

//     return (
//         <div className="dashboard-main">
//             <Navbar setSearchQuery={setSearchQuery} />
//             <div className="dashboard-center">
//                 <Sidebar />
//                 <Outlet context={{ searchQuery }} /> {/* Pass searchQuery using Outlet Context */}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
