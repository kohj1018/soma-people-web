import Search from '@mui/icons-material/Search'
import React, { useState } from 'react'
import { Modal } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import DisabledByDefault from '@mui/icons-material/DisabledByDefault'

interface Props {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

function MobileBoardSearchHeader({ searchTerm, setSearchTerm }: Props) {
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false)

  const handleModalClose = () => {
    setIsSearchMode(false)
    setSearchTerm('')
  }

  return (
    <header className='fixed h-14 top-0 inset-x-0 px-5 py-3.5 flex items-center justify-between bg-white z-50'>
      <h1 className='text-xl font-semibold text-gray-700'>게시판</h1>
      <button onClick={() => setIsSearchMode(true)}>
        <Search className='w-6 h-6 text-gray-700' />
      </button>
      <Modal
        open={isSearchMode}
        onClose={handleModalClose}
      >
        <div className='fixed h-14 top-0 w-screen px-5 py-2.5 flex items-center justify-between space-x-4 bg-white'>
          <button onClick={() => setIsSearchMode(false)}>
            <KeyboardArrowLeft className='w-6 h-6 text-gray-700' />
          </button>
          <div className='grow pl-4 pr-2 py-1.5 flex items-center space-x-1 bg-gray-100 rounded'>
            <input
              type='text'
              className='grow bg-gray-100 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none'
              placeholder='검색어를 입력해주세요'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 모바일 환경에서는 maxLength 속성이 먹히지 않기 때문에 js 추가
              required
            />
            <button onClick={() => setSearchTerm('')}>
              <DisabledByDefault className='w-6 h-6 text-gray-300' />
            </button>
          </div>
        </div>
      </Modal>
    </header>
  )
}

export default MobileBoardSearchHeader