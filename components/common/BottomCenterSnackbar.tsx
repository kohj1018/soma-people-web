import { Snackbar } from '@mui/material'
import CheckCircle from '@mui/icons-material/CheckCircle'

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
      className='mx-auto w-4/5 !bottom-[3rem] px-5 py-3 rounded bg-gray-700 lg:!bottom-[10rem] lg:w-2/5'
      key='bottomcenter'
      autoHideDuration={3000}
    >
      <div className='w-full flex items-stretch space-x-1.5 text-white'>
        <CheckCircle className='!w-5 !h-5' />
        <p className='text-base font-semibold'>{message}</p>
      </div>
    </Snackbar>
  )
}

export default BottomCenterSnackbar