// stores/useUiStore.ts
import { create } from 'zustand'

interface UIState {
  boardOrientation: 'white' | 'black'
  toggleOrientation: () => void
  setOrientation: (orientation: 'white' | 'black') => void
}

export const useUIStore = create<UIState>((set) => ({
  boardOrientation: 'white',
  
  toggleOrientation: () => set((state) => ({
    boardOrientation: state.boardOrientation === 'white' ? 'black' : 'white'
  })),
  
  setOrientation: (orientation) => set({ boardOrientation: orientation })
}))