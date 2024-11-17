// App.js
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./contexts/AuthContext";
import { Box } from "@mui/material";
import ListView from "./pages/ListView";
import BroadView from "./pages/BroadView";
import ChartView from "./pages/ChartView";

// Create a Material-UI compatible theme
export const theme = createTheme({
  palette: {
    primary: { main: "#3498db" },
    secondary: { main: "#2ecc71" },
    background: { default: "#cbdbff" },
    text: { primary: "#333333" },
    accent: { main: "#e74c3c" },
  },
  typography: {
    fontFamily: "Times New Roman, Times, serif",
  },
});

function App() {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  return (
    <ThemeProvider theme={theme}>
      <Box className="container">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route path="/listview" element={<ListView />} />
            <Route path="/broadview" element={<BroadView />} />
            <Route path="/chartview" element={<ChartView />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
