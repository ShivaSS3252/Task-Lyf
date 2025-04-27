import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "../contexts/ThemeContext";
import worklaptop from "../assets/worklaptop.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { theme, darkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <Box
      sx={{
        boxShadow: 3,
        flexGrow: 1,
        bgcolor: darkMode ? "#121212" : "#FFFFFF",
        color: darkMode ? "#ffffff" : "#333333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const { email, password } = values;
          const API_URL = process.env.REACT_APP_API_URL;
          setLoading(true);
          fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setLoading(false);
              console.log("datad", data);
              if (data.status === "Success" || data.status === "success") {
                toast.success("LoggedIn successfully!");
                login(data.token, data.user);
                resetForm();
              } else if (data.status === "fail") {
                toast.error(data.message);
              } else {
                toast.error(data.message);
              }
            })
            .catch((error) => {
              setLoading(false);
              console.error("Fetch error:", error);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={10}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Typography
                  sx={{
                    color: darkMode ? "#FFFFFF" : "#000000",
                    fontWeight: "bolder",
                    fontSize: "30px",
                  }}
                >
                  Login
                </Typography>

                <Grid item size={{ xs: 12 }} sx={{ py: 1 }}>
                  <Field
                    as={TextField}
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    variant="standard"
                    fullWidth
                    required
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                    InputProps={{
                      sx: {
                        "& input::placeholder": {
                          color: darkMode ? "#FFFFFF" : "#333333", // Placeholder color
                          opacity: 1,
                        },
                        "& input": {
                          color: darkMode ? "#FFFFFF" : "#333333", // Typing text color
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item size={{ xs: 12 }} sx={{ py: 1 }}>
                  <Field
                    as={TextField}
                    id="password"
                    name="password"
                    placeholder="Your Password"
                    variant="standard"
                    fullWidth
                    required
                    type={showPassword ? "text" : "password"}
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" />}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      ),
                      sx: {
                        "& input::placeholder": {
                          color: darkMode ? "#FFFFFF" : "#333333", // Placeholder color
                          opacity: 1,
                        },
                        "& input": {
                          color: darkMode ? "#FFFFFF" : "#333333", // Typing text color
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Login Button */}
                <Grid item size={{ xs: 12 }} sx={{ py: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant={darkMode ? "text" : "contained"}
                      size="medium"
                      type="submit"
                      disabled={loading} // Disable the button when loading
                      startIcon={
                        loading ? <CircularProgress size={20} /> : null
                      }
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                    <Box sx={{ display: "inline" }}>
                      <Typography
                        sx={{
                          color: darkMode ? "#63C5DA" : "#180161",
                          display: "inline",
                        }}
                      >
                        New User?{" "}
                      </Typography>
                      <Typography
                        sx={{
                          color: darkMode ? "#48AAAD" : "#180161",
                          cursor: "pointer",
                          display: "inline",
                          ":hover": { color: "#eb3678" },
                        }}
                        onClick={() => navigate("/")}
                      >
                        Register
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Right Side Image */}
              <Grid item size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: { xs: "none", md: "inline" } }}>
                  <img
                    src={worklaptop}
                    alt="Work Laptop"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
