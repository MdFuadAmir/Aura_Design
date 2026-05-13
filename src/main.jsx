import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router";
import router from "./Router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Context/AuthProvider";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer/>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
);
