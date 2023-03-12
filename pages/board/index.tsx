import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import { useBoardIdOfLastViewedStore, useSnackbarOpenStore } from '../../stores/stores'
import MobileBoardSearchHeader from '../../components/layout/mobileHeader/MobileBoardSearchHeader'
import { useEffect, useState } from 'react'
import MobileBoardTap from '../../components/layout/mobileHeader/MobileBoardTap'
import useBoardInfoList from '../../hooks/useBoardInfoList'
import MainArea from '../../components/layout/MainArea'
import useUserInfo from '../../hooks/useUserInfo'
import LoadingCircular from '../../components/layout/LoadingCircular'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Mode from '@mui/icons-material/Mode'
import { useRouter } from 'next/router'
import SEO from '../../components/SEO'
import { useInfinitePostsScrollYStore } from '../../stores/scrollStore/scrollStores'
import useKeepScrolling from '../../hooks/useKeepScrolling'
const InfinitePostListSection = dynamic(() => import('../../components/common/InfinitePostListSection'),{loading: () => <LoadingCircular />, ssr: false})

const Board: NextPage = () => {
  const router = useRouter()
  const { boardIdOfLastViewed, setBoardIdOfLastViewed } = useBoardIdOfLastViewedStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const userInfo = useUserInfo()
  const boardInfoList = useBoardInfoList(userInfo)
  const infinitePostsScrollY = useInfinitePostsScrollYStore(state => state.infinitePostsScrollY) // 스크롤 위치 저장
  const { setMessage } = useSnackbarOpenStore()

  // 소마인 인증 안했는데 준비생 게시판 외 게시판 보는 경우 Redirect
  useEffect(() => {
    if (boardIdOfLastViewed !== 4) {
      if (!!userInfo && !userInfo.isCertified) {
        setMessage('해당 게시판은 프로필 탭에서 소마인 인증을 받은 후 이용할 수 있습니다.')
        router.back()
      }
    }
  }, [userInfo])

  // 스크롤 위치 유지
  useKeepScrolling(infinitePostsScrollY)


  return (
    <MainContainer>
      <SEO title={`${boardInfoList.find((boardInfo) => boardInfo.boardId === boardIdOfLastViewed)?.name} : 게시판`} />

      {/* 검색 헤더 */}
      <MobileBoardSearchHeader
        boardId={boardIdOfLastViewed}
        boardName={boardInfoList.find((boardInfo) => boardInfo.boardId === boardIdOfLastViewed)?.name ?? ''}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* 게시판 탭 */}
      <MobileBoardTap
        boardInfoList={boardInfoList ?? []}
        boardIdOfLastViewed={boardIdOfLastViewed}
        setBoardIdOfLastViewed={setBoardIdOfLastViewed}
      />

      <MainArea>
        {/* 게시글 무한 스크롤 영역 */}
        {!!userInfo &&
          <InfinitePostListSection userId={userInfo.userId} boardInfoList={boardInfoList} />
        }

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