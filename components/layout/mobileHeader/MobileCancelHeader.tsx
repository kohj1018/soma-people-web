import { useRouter } from 'next/router'
import Clear from '@mui/icons-material/Clear'

interface Props {
  title: string
  buttonFunc: () => void
  activateButton: boolean
}

function MobileCancelHeader({ title, buttonFunc, activateButton }: Props) {
  const router = useRouter()

  return (
    <header className='fixed h-14 top-0 inset-x-0 px-5 py-3.5 flex items-center justify-center bg-white z-50 lg:hidden'>
      <button
        onClick={() => router.back()}
        className='absolute left-5'
      >
        <Clear className='!w-6 !h-6 text-gray-700' />
      </button>
      <p className='text-base font-semibold text-gray-700'>{title}</p>
      <button onClick={buttonFunc} className={'absolute right-5 px-3 py-1 rounded text-sm font-semibold' + (activateButton ? ' bg-blue-500 text-white' : ' bg-gray-200 text-gray-400')}>
        등록
      </button>
      <div className='absolute bottom-0 inset-x-0 h-px bg-gray-100'></div>
    </header>
  )
}

export default MobileCancelHeader