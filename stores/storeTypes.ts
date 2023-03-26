import { useBoardRefOfLastViewedStore } from './stores'
import { RefObject } from 'react'

export type SnackbarOpenState = {
  message: string
  setMessage: (message: string) => void
  isSnackbarOpen: boolean
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => void
}

export type BoardIdOfLastViewedState = {
  boardIdOfLastViewed: number
  setBoardIdOfLastViewed: (boardIdOfLastViewed: number) => void
}

export type BoardRefOfLastViewedState = {
  boardRefOfLastViewed: RefObject<HTMLButtonElement> | null
  setBoardRefOfLastViewed: (boardRefOfLastViewed: RefObject<HTMLButtonElement>) => void
}

export type IsMobileState = {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
}

export type IsFirstLoadState = {
  isFirstLoad: boolean
  setIsFirstLoad: (isFirstLoad: boolean) => void
}