import Search from '@mui/icons-material/Search'
import React, { useState } from 'react'
import SearchModal from '../../common/SearchModal'

interface Props {
  boardId: number
  boardName: string
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

function MobileBoardSearchHeader({ boardId, boardName, searchTerm, setSearchTerm }: Props) {
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false)

  return (
    <header className='fixed h-14 top-0 inset-x-0 px-5 py-3.5 flex items-center justify-between bg-white z-50 lg:hidden'>
      <h1 className='text-xl font-semibold text-gray-700'>게시판</h1>
      <button onClick={() => setIsSearchMode(true)}>
        <Search className='w-6 h-6 text-gray-700' />
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