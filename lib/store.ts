import { create } from 'zustand';

interface NavigationState {
  activeTab: string;
  sidebarOpen: boolean;
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

interface AppState {
  theme: 'light' | 'dark' | 'system';
  selectedStudentId: string | null;
  selectedPartnerId: string | null;
  setSelectedStudentId: (id: string | null) => void;
  setSelectedPartnerId: (id: string | null) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeTab: 'home',
  sidebarOpen: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

export const useAppStore = create<AppState>((set) => ({
  theme: 'system',
  selectedStudentId: null,
  selectedPartnerId: null,
  setSelectedStudentId: (id) => set({ selectedStudentId: id }),
  setSelectedPartnerId: (id) => set({ selectedPartnerId: id }),
}));