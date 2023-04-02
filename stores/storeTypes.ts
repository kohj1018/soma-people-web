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

export type IsFirstLoadState = {
  isFirstLoad: boolean
  setIsFirstLoad: (isFirstLoad: boolean) => void
}

export type TraineeBoardIdOfLastViewedState = {
  traineeBoardIdOfLastViewed: number
  setTraineeBoardIdOfLastViewed: (traineeBoardIdOfLastViewed: number) => void
}