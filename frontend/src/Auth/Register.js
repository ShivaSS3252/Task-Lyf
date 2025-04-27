import React, { useState } from "react";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import worklaptop from "../assets/worklaptop.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { theme, darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
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
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const { name, email, password } = values;
          const API_URL = process.env.REACT_APP_API_URL;
          fetch(`${API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              if (data.status === "Success" || data.status === "success") {
                toast.success(data.message);
                login(data.token, data.user);
                resetForm();
              } else if (data.status === "fail") {
                toast.error(data.message);
              } else {
                toast.error(data.message);
              }
            })
            .catch((error) => {
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
                  Sign Up
                </Typography>

                <Grid item size={{ xs: 12 }} sx={{ py: 1 }}>
                  <Field
                    as={TextField}
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    variant="standard"
                    fullWidth
                    required
                    error={touched.name && Boolean(errors.name)}
                    helperText={<ErrorMessage name="name" />}
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

                {/* Confirm Password Field */}
                <Grid item size={{ xs: 12 }} sx={{ py: 1 }}>
                  <Field
                    as={TextField}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Repeat Your Password"
                    variant="standard"
                    fullWidth
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={<ErrorMessage name="confirmPassword" />}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={handleToggleConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
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

                {/* Register Button */}
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
                    >
                      Register
                    </Button>
                    <Box sx={{ display: "inline" }}>
                      <Typography
                        sx={{
                          color: darkMode ? "#63C5DA" : "#180161",
                          display: "inline",
                        }}
                      >
                        Already a member?{" "}
                      </Typography>
                      <Typography
                        sx={{
                          color: darkMode ? "#48AAAD" : "#180161",
                          cursor: "pointer",
                          display: "inline",
                          ":hover": { color: "#eb3678" },
                        }}
                        onClick={() => navigate("/login")}
                      >
                        Login
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

export default Register;
