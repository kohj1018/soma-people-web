import { BoardIdOfLastViewedState, ScrollYState, SnackbarOpenState } from './storeTypes'
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

/** 마지막으로 보고 있던 게시판 Id 관리하는 Store */
export const useBoardIdOfLastViewed = create<BoardIdOfLastViewedState>((set) => ({
  boardIdOfLastViewed: 1,
  setBoardIdOfLastViewed: (boardIdOfLastViewed: number) => {
    set((state) => ({ ...state, boardIdOfLastViewed: boardIdOfLastViewed }))
  }
}))

/** 스크롤 Y값을 저장하는 Store */
export const useScrollYStore = create<ScrollYState>((set) => ({
  scrollY: 0,
  setScrollY: (scrollY: number) => {
    set((state) => ({ ...state, scrollY: scrollY }))
  }
}))