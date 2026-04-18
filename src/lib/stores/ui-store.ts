import { create } from "zustand";

interface UIState {
  /** Whether the mobile sidebar/drawer is open */
  sidebarOpen: boolean;
  /** Whether a global loading overlay should be shown */
  globalLoading: boolean;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  globalLoading: false,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));
