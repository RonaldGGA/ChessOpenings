// stores/useUIStore.ts
import { create } from 'zustand';

interface UIState {
  // Estado de UI
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  currentTheme: 'light' | 'dark';
  boardOrientation: 'white' | 'black';
  
  // Actions
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  toggleTheme: () => void;
  flipBoard: () => void;
  setBoardOrientation: (orientation: 'white' | 'black') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  currentTheme: 'light',
  boardOrientation: 'white',

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  toggleTheme: () => set((state) => ({ 
    currentTheme: state.currentTheme === 'light' ? 'dark' : 'light' 
  })),
  flipBoard: () => set((state) => ({ 
    boardOrientation: state.boardOrientation === 'white' ? 'black' : 'white' 
  })),
  setBoardOrientation: (orientation) => set({ boardOrientation: orientation }),
}));