export type SnackbarOpenState = {
  message: string
  setMessage: (message: string) => void
  isSnackbarOpen: boolean
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => void
}