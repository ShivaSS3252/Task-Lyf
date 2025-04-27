import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import { useTheme } from "../contexts/ThemeContext";
const pages = ["ChartView", "ListView", "BroadView"];
const settings = ["Logout"];

function Dashboard() {
  const { darkMode, toggleTheme } = useTheme();
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
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#aab4be",
          ...theme.applyStyles("dark", {
            backgroundColor: "#8796A5",
          }),
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      ...theme.applyStyles("dark", {
        backgroundColor: "#003892",
      }),
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
      ...theme.applyStyles("dark", {
        backgroundColor: "#8796A5",
      }),
    },
  }));

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: darkMode ? "121212" : "white" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 800,
              letterSpacing: ".3px",
              color: darkMode ? "white" : "black",
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
              color={darkMode ? "white" : "black"}
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
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: darkMode ? "white" : "black",
                    }}
                  >
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
              color: darkMode ? "white" : "black",
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
                backgroundColor: darkMode ? "#2c3e4c" : "#121212",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: 4,
                fontWeight: "bold",
                textTransform: "uppercase",
                gap: 1,
              }}
            >
              <TrendingUpIcon />
              ChartView
            </Button>

            {/* ListView Button with ListIcon */}
            <Button
              key="ListView"
              onClick={() => handleCloseNavMenu("ListView")}
              sx={{
                color: "white",
                backgroundColor: darkMode ? "#2c3e4c" : "#121212",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                textTransform: "uppercase",
                gap: 1,
              }}
            >
              <ListIcon /> {/* List Icon */}
              ListView
            </Button>

            {/* BroadView Button with ZoomOutMapIcon */}
            <Button
              key="BroadView"
              onClick={() => handleCloseNavMenu("BroadView")}
              sx={{
                color: "white",
                backgroundColor: darkMode ? "#2c3e4c" : "#121212",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                textTransform: "uppercase",
                gap: 1,
                mx: 4,
              }}
            >
              <ZoomOutMapIcon /> {/* Zoom Out Map Icon */}
              BroadView
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <FormControlLabel
              control={
                <MaterialUISwitch checked={darkMode} onChange={toggleTheme} />
              }
            />
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="User Name"
                sx={{
                  backgroundColor: darkMode ? "#2c3e4c" : "#121212",
                  color: "#fff",
                }}
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
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: darkMode ? "white" : "black",
                    }}
                    onClick={logout}
                  >
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
