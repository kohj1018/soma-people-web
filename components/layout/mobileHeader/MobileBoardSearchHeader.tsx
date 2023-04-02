import Search from '@mui/icons-material/Search'
import React, { useState } from 'react'
import SearchModal from '../../common/SearchModal'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import { useRouter } from 'next/router'

interface Props {
  boardId: number
  boardName: string
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

function MobileBoardSearchHeader({ boardId, boardName, searchTerm, setSearchTerm }: Props) {
  const router = useRouter()
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false)

  return (
    <header className='fixed h-14 top-0 inset-x-0 px-5 flex items-center justify-center bg-white z-50 lg:hidden'>
      {boardId === 0 ? (
        <h1 className='absolute left-5 text-xl font-semibold text-gray-700'>게시판</h1>
      ) : (
        <>
          <button
            onClick={() => router.back()}
            className='absolute left-5'
          >
            <KeyboardArrowLeft className='!w-6 !h-6 text-gray-700' />
          </button>
          <h1 className='text-base font-semibold text-gray-700'>{boardName}</h1>
        </>
      )}
      <button
        onClick={() => setIsSearchMode(true)}
        className='absolute right-5'
      >
        <Search className='!w-6 !h-6 text-gray-700' />
      </button>
      <SearchModal
        boardId={boardId}
        boardName={boardName}
        isSearchMode={isSearchMode}
        setIsSearchMode={setIsSearchMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </header>
  )
}

export default MobileBoardSearchHeader