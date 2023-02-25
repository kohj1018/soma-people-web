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

export type MenuType = '홈' | '게시판' | '프로필'
export type BottomNavValueState = {
  selectedTap: MenuType
  setSelectedTap: (selectedTap: MenuType) => void
}