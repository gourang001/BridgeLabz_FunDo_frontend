import React, { useState } from "react";
import "./Navbar.scss";
import { Menu, RotateCw, Settings, Rows2, Grip, Search } from "lucide-react";
import { Avatar, Tooltip } from "@mui/material";
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
          <Tooltip title="Main Menu" arrow>
            <Menu className="icons menu-icon" onClick={toggleSidebar} />
          </Tooltip>

          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            alt="Keep Logo"
            className="header-logo"
          />
          <div className="header-title">Fundoo</div>
        </div>
      </div>

      <div className="dashboard-header-middle-container">
        <Tooltip title="Search" arrow>
          <Search className="search-icon" />
        </Tooltip>
        <input
          className="header-middle-search-input"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="header-right">
        <div className="header-right-container-icons">
          <Tooltip title="Refresh" arrow>
            <RotateCw className="icons" />
          </Tooltip>
          <Tooltip title="List View" arrow>
            <Rows2 className="icons" />
          </Tooltip>
          <Tooltip title="Settings" arrow>
            <Settings className="icons" />
          </Tooltip>
        </div>

        <div className="header-right-container-account">
          <Tooltip title="Apps" arrow>
            <Grip className="icons" />
          </Tooltip>
          <Tooltip title="User Profile" arrow>
            <Avatar
              sx={{ bgcolor: "#8a6aff", width: 40, height: 40, fontSize: 20 }}
              onClick={handleProfileClick}
            >
              {firstLetter}
            </Avatar>
          </Tooltip>
        </div>
      </div>

      <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
}

export default Navbar;