// SnackbarAlert.js
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Custom styling based on severity
const CustomAlert = styled(Alert)(({ severity }) => ({
  ...(severity === "Success" && {
    backgroundColor: "#4caf50", // Green color for success
    color: "#ffffff",
  }),
  ...(severity === "error" ||
    (severity === "fail" && {
      backgroundColor: "#f44336", // Red color for error
      color: "#ffffff",
    })),
}));

const SnackbarAlert = ({ open, message, severity, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <CustomAlert onClose={onClose} severity={severity}>
      {message}
    </CustomAlert>
  </Snackbar>
);

export default SnackbarAlert;
