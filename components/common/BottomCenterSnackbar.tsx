import { Snackbar } from '@mui/material'

interface Props {
  isSnackbarOpen: boolean
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => void
  message: string
}

function BottomCenterSnackbar({ isSnackbarOpen, setIsSnackbarOpen, message }: Props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={isSnackbarOpen}
      onClose={() => setIsSnackbarOpen(false)}
      className='mx-auto w-4/5 !bottom-[3rem] pl-4 pr-2.5 py-2.5 rounded-lg bg-gray-500 lg:!bottom-[10rem] lg:w-2/5'
      key='bottomcenter'
      autoHideDuration={3000}
    >
      <p className='text-base font-semibold text-white'>{message}</p>
    </Snackbar>
  )
}

export default BottomCenterSnackbar