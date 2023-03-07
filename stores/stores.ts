import { BoardIdOfLastViewedState, BoardRefOfLastViewedState, SnackbarOpenState } from './storeTypes'
import { create } from 'zustand'
import { RefObject } from 'react'

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
export const useBoardIdOfLastViewedStore = create<BoardIdOfLastViewedState>((set) => ({
  boardIdOfLastViewed: 1,
  setBoardIdOfLastViewed: (boardIdOfLastViewed: number) => {
    set((state) => ({ ...state, boardIdOfLastViewed: boardIdOfLastViewed }))
  }
}))

/** 마지막으로 보고 있던 게시판 Ref 관리하는 Store */
export const useBoardRefOfLastViewedStore = create<BoardRefOfLastViewedState>((set) => ({
  boardRefOfLastViewed: null,
  setBoardRefOfLastViewed: (boardRefOfLastViewed: RefObject<HTMLButtonElement>) => {
    set((state) => ({ ...state, boardRefOfLastViewed: boardRefOfLastViewed }))
  }
}))