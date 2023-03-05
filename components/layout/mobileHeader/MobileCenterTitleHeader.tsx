import { useRouter } from 'next/router'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'

interface Props {
  title: string
}

function MobileCenterTitleHeader({ title } : Props) {
  const router = useRouter()

  return (
    <header className='fixed h-14 top-0 inset-x-0 px-5 py-4 flex items-center justify-center bg-white z-50 lg:hidden'>
      <button
        onClick={() => router.back()}
        className='absolute left-5'
      >
        <KeyboardArrowLeft className='!w-6 !h-6 text-gray-700' />
      </button>
      <p className='text-base font-semibold text-gray-700'>{title}</p>
      <div className='absolute bottom-0 inset-x-0 h-px bg-gray-100'></div>
    </header>
  )
}

export default MobileCenterTitleHeader