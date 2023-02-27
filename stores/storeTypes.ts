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

export type InfinitePostsScrollYState = {
  infinitePostsScrollY: number
  setInfinitePostsScrollY: (infinitePostsScrollY: number) => void
}

export type MainPageScrollYState = {
  mainPageScrollY: number
  setMainPageScrollY: (mainPageScrollY: number) => void
}

export type BoardTapScrollXState = {
  boardTapScrollX: number
  setBoardTapScrollX: (boardTapScrollX: number) => void
}