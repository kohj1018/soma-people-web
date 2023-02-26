import { useRouter } from 'next/router'
import Clear from '@mui/icons-material/Clear'
import React from 'react'

interface Props {
  title: string
  buttonFunc: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function MobileCancelHeader({ title, buttonFunc }: Props) {
  const router = useRouter()

  return (
    <header className='fixed h-14 top-0 inset-x-0 px-5 py-3.5 flex items-center justify-center bg-white'>
      <button
        onClick={() => router.back()}
        className='absolute left-5'
      >
        <Clear className='!w-6 !h-6 text-gray-700' />
      </button>
      <p className='text-base font-semibold text-gray-700'>{title}</p>
      <button onClick={(e) => buttonFunc(e)} className='absolute right-5 px-3 py-1 rounded bg-blue-500 text-white'>
        등록
      </button>
      <div className='absolute bottom-0 inset-x-0 h-px bg-gray-100'></div>
    </header>
  )
}

export default MobileCancelHeader