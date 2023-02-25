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

export type ScrollYState = {
  scrollY: number
  setScrollY: (scrollY: number) => void
}