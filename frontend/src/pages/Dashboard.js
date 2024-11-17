import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../contexts/AuthContext";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ListView from "./ListView";
import BroadView from "./BroadView";
import ChartView from "./ChartView";
import ListIcon from "@mui/icons-material/List"; // Import ListIcon
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap"; // Import ZoomOutMapIcon

const pages = ["ChartView", "ListView", "BroadView"];
const settings = ["Logout"];

function Dashboard() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activePage, setActivePage] = React.useState("ChartView"); // State to track active page
  const { logout, userData } = useAuth();
  console.log("userData", userData.name.slice(0, 1));
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    setActivePage(page); // Set active page based on menu item clicked
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 800,
              letterSpacing: ".3px",
              color: "black",
              textDecoration: "none",
            }}
          >
            TASKLYF
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3px",
              color: "black",
              textDecoration: "none",
            }}
          >
            TASKLYF
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Button
              key="ChartView"
              onClick={() => handleCloseNavMenu("ChartView")}
              sx={{
                color: "white",
                backgroundColor: "black",
                display: "block",
                mx: 4,
                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              <TrendingUpIcon sx={{ mr: 1 }} /> {/* Zoom Out Map Icon */}
              ChartView
            </Button>
            {/* ListView Button with ListIcon */}
            <Button
              key="ListView"
              onClick={() => handleCloseNavMenu("ListView")}
              sx={{
                color: "white",
                backgroundColor: "black",
                display: "block",
                mx: 4,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListIcon sx={{ mr: 1 }} /> {/* List Icon */}
              ListView
            </Button>

            {/* BroadView Button with ZoomOutMapIcon */}
            <Button
              key="BroadView"
              onClick={() => handleCloseNavMenu("BroadView")}
              sx={{
                color: "white",
                backgroundColor: "black",
                display: "block",
                mx: 4,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ZoomOutMapIcon sx={{ mr: 1 }} /> {/* Zoom Out Map Icon */}
              BroadView
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="User Name"
                sx={{ backgroundColor: "#000000", color: "#fff" }}
              >
                {userData.name.slice(0, 1)}{" "}
              </Avatar>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }} onClick={logout}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Conditional rendering of ListView or BroadView */}
      <Box sx={{ padding: "16px" }}>
        {activePage === "ListView" && <ListView />}
        {activePage === "BroadView" && <BroadView />}
        {activePage === "ChartView" && <ChartView />}
      </Box>
    </>
  );
}

export default Dashboard;
