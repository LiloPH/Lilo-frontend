import { create } from "zustand";
import { login, logout } from "../api/auth";
import { toast } from "react-toastify";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (auth: boolean) => void;
  setUser: (user: User) => void;
  loginWithGoogle: (code: string, callback?: () => void) => Promise<void>;
  logout: (callback?: () => void) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (auth) => set({ isAuthenticated: auth }),
  setUser: (user) => set({ user }),
  loginWithGoogle: async (code, callback) => {
    const result = await login(code);

    if (!result.status) {
      toast.error(result.error);
      return;
    }

    set({ isAuthenticated: true, user: result.data?.user });
    callback?.();
  },
  logout: async (callback) => {
    const result = await logout();

    if (!result.status) {
      toast.error(result.error);
      return;
    }

    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["x-api-key"];
    set({ isAuthenticated: false, user: null });

    toast.success("Logout successful");
    callback?.();
  },
}));
