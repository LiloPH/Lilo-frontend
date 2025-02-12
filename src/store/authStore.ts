import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuth: (auth) => set({ isAuthenticated: auth }),
}));
