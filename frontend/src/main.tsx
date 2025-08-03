import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./authContext/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <AuthProvider>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
      ></ToastContainer>
      <Toaster></Toaster>
    </AuthProvider>
  </HelmetProvider>
);
