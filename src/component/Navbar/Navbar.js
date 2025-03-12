import React, { useState } from "react";
import "./Navbar.scss";
import { Menu, RotateCw, Settings, Rows2, Grip, Search } from "lucide-react";
import { Avatar, Tooltip } from "@mui/material"; // Import Tooltip
import ProfileMenu from "./ProfileMenu";

function Navbar({ toggleSidebar, setSearchQuery }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const firstLetter = localStorage.getItem("email")?.charAt(0).toUpperCase() || "?";

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="dashboard-header">
            <div className="header-left">
                <div className="dashboard-header-left-container">
                    <div className="header-left-container-menu">
                        <Tooltip title="Main Menu" arrow>
                            <Menu className="icons" onClick={toggleSidebar} />
                        </Tooltip>
                    </div>
                    <div className="header-left-container-logo">
                        <img
                            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                            alt="Image not Found"
                        />
                    </div>
                    <div className="header-left-container-title">Fundoo</div>
                </div>
            </div>
            <div className="header-right">
                <div className="dashboard-header-middle-container">
                    <div className="header-middle-search-icon">
                        <Tooltip title="Search" arrow>
                            <Search className="search-icon" />
                        </Tooltip>
                    </div>
                    <input
                        className="header-middle-search-input"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="dashboard-header-right-container">
                    <div className="header-right-container-icons">
                        <div className="icon-div">
                            <Tooltip title="Refresh" arrow>
                                <RotateCw className="icons" />
                            </Tooltip>
                        </div>
                        <div className="icon-div row-icon">
                            <Tooltip title="List View" arrow>
                                <Rows2 className="icons" />
                            </Tooltip>
                        </div>
                        <div className="icon-div">
                            <Tooltip title="Settings" arrow>
                                <Settings className="icons" />
                            </Tooltip>
                        </div>
                    </div>
                    <div className="header-right-container-account">
                        <div className="icon-div-account2">
                            <Tooltip title="Apps" arrow>
                                <Grip className="icons" />
                            </Tooltip>
                        </div>
                        <div className="icon-div-account" onClick={handleProfileClick}>
                            <Tooltip title="User Profile" arrow>
                                <Avatar
                                    sx={{ bgcolor: "#8a6aff", width: 40, height: 40, fontSize: 20 }}
                                >
                                    {firstLetter}
                                </Avatar>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Menu Pop-up using MUI Popover */}
            <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} />
        </div>
    );
}

export default Navbar;
