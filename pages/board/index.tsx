import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import { useBoardIdOfLastViewed } from '../../stores/stores'
import MobileBoardSearchHeader from '../../components/layout/mobileHeader/MobileBoardSearchHeader'
import { useState } from 'react'
import MobileBoardTap from '../../components/layout/mobileHeader/MobileBoardTap'
import useBoardInfoList from '../../hooks/useBoardInfoList'
import MainArea from '../../components/layout/MainArea'
import useUserInfo from '../../hooks/useUserInfo'
import LoadingCircular from '../../components/layout/LoadingCircular'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Mode from '@mui/icons-material/Mode'
const InfinitePostListSection = dynamic(() => import('../../components/common/InfinitePostListSection'),{loading: () => <LoadingCircular />, ssr: false})

const Board: NextPage = () => {
  const { boardIdOfLastViewed, setBoardIdOfLastViewed } = useBoardIdOfLastViewed()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const userInfo = useUserInfo()
  const boardInfoList = useBoardInfoList(userInfo)

  return (
    <MainContainer>
      <MobileBoardSearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MobileBoardTap
        boardInfoList={boardInfoList ?? []}
        boardIdOfLastViewed={boardIdOfLastViewed}
        setBoardIdOfLastViewed={setBoardIdOfLastViewed}
      />

      <MainArea>
        <InfinitePostListSection userId={userInfo?.userId ?? null} />
        <Link
          href={{
            pathname: `/board/${boardIdOfLastViewed}/addPost`,
            query: {
              boardId: boardIdOfLastViewed,
              boardName: boardInfoList.find((boardInfo) => boardInfo.boardId === boardIdOfLastViewed)?.name
            }
          }}
          className='fixed bottom-6 right-6'
        >
          <div className='px-3 py-3 flex items-center justify-center rounded-full bg-blue-500 drop-shadow-FAB'>
            <Mode className='w-6 h-6 text-white' />
          </div>
        </Link>
      </MainArea>
    </MainContainer>
  )
}

export default Board