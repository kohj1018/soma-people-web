import Image from 'next/image'
import mainLogo from '../../public/mainLogo.svg'
import Link from 'next/link'
import DisabledByDefault from '@mui/icons-material/DisabledByDefault'
import Search from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSnackbarOpenStore } from '../../stores/stores'
import useUserInfo from '../../hooks/useUserInfo'
import useUserAccessibleBoardInfo from '../../hooks/useUserAccessibleBoardInfo'

const MainHeader = () => {
  const router = useRouter()
  const userInfo = useUserInfo()
  const userAccessibleBoardInfo = useUserAccessibleBoardInfo(userInfo)
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { setMessage } = useSnackbarOpenStore()

  const goToSearch = () => {
    if (isSearchMode) {
      if (!!searchTerm && searchTerm.replace(/\s/g, '')) {  // 공백만 있는 경우 검색 안함
        router.push({
          pathname: '/search',
          query: {
            boardId: 0,
            boardName: '통합',
            searchTerm: searchTerm
          }
        })
      } else {
        setMessage('검색어를 입력해주세요.')
      }
    } else {
      setIsSearchMode(true)
    }
  }

  const cancelSearch = () => {
    if (searchTerm) {
      setSearchTerm('')
    } else {
      setIsSearchMode(false)
    }
  }

  return (
    <header className='hidden fixed top-0 inset-x-0 h-14 items-center justify-between bg-zinc-900 z-50 lg:flex lg:mainWidthLimit'>
      <div className='w-full h-full flex items-center justify-between'>
        <Link
          href='/'
          className='w-[8.5rem] mr-20'
        >
          <Image
            src={mainLogo}
            className='w-[8.5rem] h-8'
            alt='소마인 로고'
            priority
          />
        </Link>

        <div className='w-full h-full flex items-center justify-between'>
          <nav className={'items-center space-x-10 whitespace-nowrap mr-8'}>
            <Link
              href='/'
              className='w-[2.625rem] text-center text-base font-semibold text-white whitespace-nowrap'
            >
              홈
            </Link>
            <Link
              href={`/board/${userAccessibleBoardInfo.listVerForPcHeader[0]?.boardId ?? ''}`}
              className='w-[2.625rem] text-center text-base font-semibold text-white whitespace-nowrap'
            >
              게시판
            </Link>
          </nav>

          {/* TODO: 일단 overflow-hidden으로 해놓긴 했는데 끊기는 느낌나서 추후 수정 필요 */}
          <div className={'h-full pl-6 pr-4 flex items-center justify-between space-x-1 bg-zinc-700 duration-500 overflow-hidden' + (isSearchMode ? ' visible w-full' : ' invisible w-0')}>
            <input
              type='text'
              className='grow bg-zinc-700 text-lg font-semibold text-white placeholder:text-gray-300 focus:outline-none'
              placeholder='검색어를 입력해주세요'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') goToSearch() }}
              required
            />
            <button onClick={cancelSearch}>
              <DisabledByDefault className='w-6 h-6 text-gray-300' />
            </button>
          </div>
        </div>
      </div>

      <div className='ml-3 flex items-center space-x-3'>
        <button
          onClick={() => goToSearch()}
        >
          <Search className='w-6 h-6 text-white' />
        </button>
        <Link href='/profile'>
          <AccountCircle className='!w-6 !h-6 text-white' />
        </Link>
      </div>
    </header>
  )
}

export default MainHeader