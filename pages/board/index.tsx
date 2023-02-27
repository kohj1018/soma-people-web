import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import { useBoardIdOfLastViewedStore } from '../../stores/stores'
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
  const { boardIdOfLastViewed, setBoardIdOfLastViewed } = useBoardIdOfLastViewedStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const userInfo = useUserInfo()
  const boardInfoList = useBoardInfoList(userInfo)

  return (
    <MainContainer>
      {/* 검색 헤더 */}
      <MobileBoardSearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* 게시판 탭 */}
      <MobileBoardTap
        boardInfoList={boardInfoList ?? []}
        boardIdOfLastViewed={boardIdOfLastViewed}
        setBoardIdOfLastViewed={setBoardIdOfLastViewed}
      />

      <MainArea>
        {/* 게시글 무한 스크롤 영역 */}
        <InfinitePostListSection userId={userInfo?.userId ?? null} />

        {/* 글쓰기 버튼 */}
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