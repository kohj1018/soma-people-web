import { SnackbarOpenState } from './storeTypes'
import { create } from 'zustand'

/** 스낵바 띄우는 Store */
export const useSnackbarOpenStore = create<SnackbarOpenState>((set) => ({
  message: '',
  setMessage: (message: string) => {
    set((state) => ({ ...state, message: message, isSnackbarOpen: true }))
  },
  isSnackbarOpen: false,
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => {
    set((state) => ({ ...state, isSnackbarOpen: isSnackbarOpen }))
  },
}))