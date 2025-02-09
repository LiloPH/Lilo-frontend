import { create } from "zustand";

interface SidebarState {
  isMobileOpen: boolean;
  isMobile: boolean;
  isExpanded: boolean;
  toggleMobile: () => void;
  setIsMobile: (isMobile: boolean) => void;
  toggleExpanded: () => void;
  closeMobile: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isMobileOpen: false,
  isMobile: window.innerWidth < 768,
  isExpanded: true,
  toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setIsMobile: (isMobile) => set({ isMobile }),
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  closeMobile: () => set({ isMobileOpen: false }),
}));

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    useSidebarStore.getState().setIsMobile(window.innerWidth < 768);
  });
}
