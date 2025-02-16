import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./api/axios";

import { routeTree } from "./routeTree.gen";
const isAuthenticated = useAuthStore.getState().isAuthenticated;
const user = useAuthStore.getState().user;

const queryClient = new QueryClient();

const router = createRouter({ routeTree, context: { isAuthenticated, user } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          <RouterProvider router={router} context={{ isAuthenticated, user }} />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
