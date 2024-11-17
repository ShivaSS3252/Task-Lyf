import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import store from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  </AuthProvider>
  // </React.StrictMode>
);
