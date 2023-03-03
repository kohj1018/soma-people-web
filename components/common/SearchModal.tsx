import { Modal } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import DisabledByDefault from '@mui/icons-material/DisabledByDefault'
import Search from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import { useSnackbarOpenStore } from '../../stores/stores'

interface Props {
  boardId: number
  boardName: string
  isSearchMode: boolean
  setIsSearchMode: (isSearchMode: boolean) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

function SearchModal({ boardId, boardName, isSearchMode, setIsSearchMode, searchTerm, setSearchTerm }: Props) {
  const router = useRouter()
  const { setMessage } = useSnackbarOpenStore()


  const handleModalClose = () => {
    setIsSearchMode(false)
    setSearchTerm('')
  }

  const goToSearch = () => {
    if (!!searchTerm && searchTerm.replace(/\s/g, '')) {  // 공백만 있는 경우 검색 안함
      router.push({
        pathname: '/search',
        query: {
          boardId: boardId,
          boardName: boardName,
          searchTerm: searchTerm
        }
      })
    } else {
      setMessage('검색어를 입력해주세요.')
    }
  }

  return (
    <Modal
      open={isSearchMode}
      onClose={handleModalClose}
    >
      <div className='fixed h-14 top-0 w-screen px-5 py-2.5 flex items-center justify-between space-x-4 bg-white'>
        <button onClick={() => setIsSearchMode(false)}>
          <KeyboardArrowLeft className='w-6 h-6 text-gray-700' />
        </button>
        <div className='w-full pl-4 pr-2 py-1.5 flex items-center justify-between space-x-1 bg-gray-100 rounded'>
          <input
            type='text'
            className='w-full bg-gray-100 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none'
            placeholder='검색어를 입력해주세요'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') goToSearch() }}
            required
          />
          <button onClick={() => setSearchTerm('')}>
            <DisabledByDefault className='w-6 h-6 text-gray-300' />
          </button>
        </div>
        <button onClick={goToSearch}>
          <Search className='!w-6 !h-6 text-gray-700' />
        </button>
      </div>
    </Modal>
  )
}

export default SearchModal