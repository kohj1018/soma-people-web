import React, { useState } from 'react'
import { useRouter } from 'next/router'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu'

interface Props {
  title: string
  children: React.ReactNode
}

function MobileBackHeader({ title, children }: Props) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <header className='fixed h-14 top-0 inset-x-0 px-5 py-4 flex items-center justify-between bg-white z-50 lg:hidden'>
      <button
        onClick={() => router.back()}
        className='flex items-center space-x-2'
      >
        <KeyboardArrowLeft className='!w-6 !h-6 text-gray-700' />
        <h1 className='text-base font-semibold text-gray-700'>{title}</h1>
      </button>
      <button onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreHoriz className='!w-6 !h-6 text-gray-700' />
      </button>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {children}
      </Menu>

      <div className='absolute bottom-0 inset-x-0 h-px bg-gray-100'></div>
    </header>
  )
}

export default MobileBackHeader