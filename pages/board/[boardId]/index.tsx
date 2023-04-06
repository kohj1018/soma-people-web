import { NextPage } from 'next'
import MainContainer from '../../../components/layout/MainContainer'
import MobileBoardSearchHeader from '../../../components/layout/mobileHeader/MobileBoardSearchHeader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useUserInfo from '../../../hooks/useUserInfo'
import useUserAccessibleBoardInfo from '../../../hooks/useUserAccessibleBoardInfo'
import Link from 'next/link'
import MainArea from '../../../components/layout/MainArea'
import { THIS_YEAR_CARDINAL_NUM, TRAINEE_BOARD_ID, traineeBoardInfoList } from '../../../utils/config'
import dynamic from 'next/dynamic'
import LoadingCircular from '../../../components/layout/LoadingCircular'
import Image from 'next/image'
import traineeBoardBanner from '../../../public/banner/traineeBoardBanner.svg'
import pcTraineeBoardBanner from '../../../public/banner/pcTraineeBoardBanner.svg'
import prepStudentBoardBanner from '../../../public/banner/prepStudentBoardBanner.svg'
import pcPrepStudentBoardBanner from '../../../public/banner/pcPrepStudentBoardBanner.svg'
import { useSnackbarOpenStore, useTraineeBoardIdOfLastViewedStore } from '../../../stores/stores'
import SEO from '../../../components/SEO'
import useKeepScrolling from '../../../hooks/useKeepScrolling'
import { useInfinitePostsScrollYStore } from '../../../stores/scrollStore/scrollStores'
import Mode from '@mui/icons-material/Mode'
const InfiniteTraineePostListSection = dynamic(() => import('../../../components/common/InfiniteTraineePostListSection'), {loading: () => <LoadingCircular />, ssr: false})
const InfinitePostListSection = dynamic(() => import('../../../components/common/InfinitePostListSection'), {loading: () => <LoadingCircular />, ssr: false})

const BoardDetail: NextPage = () => {
  const router = useRouter()
  const boardId: number = parseInt(router.query.boardId as string)
  const [boardName, setBoardName] = useState<string>('')
  const userInfo = useUserInfo()
  const userAccessibleBoardInfo = useUserAccessibleBoardInfo(userInfo)
  const { traineeBoardIdOfLastViewed, setTraineeBoardIdOfLastViewed } = useTraineeBoardIdOfLastViewedStore()
  const [isTraineeBoard, setIsTraineeBoard] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const infinitePostsScrollY = useInfinitePostsScrollYStore(state => state.infinitePostsScrollY) // 스크롤 위치 저장
  const { setMessage } = useSnackbarOpenStore()

  // Redirect 처리
  useEffect(() => {
    if (!!userInfo) {
      // 소마인 인증 안했는데 준비생 게시판 외 게시판 보는 경우
      if (boardId !== 4 && !userInfo.isCertified) {
        setMessage('해당 게시판은 프로필 탭에서 소마인 인증을 받은 후 이용할 수 있습니다.')
        router.back()
      }

      // 기수가 다른 경우
      if (boardId.toString().length === 3) {  // 수료생 or 연수생 게시판인 경우
        if (userInfo.userType !== '사무국' && userInfo.userType !== '관리자') { // 사무국 또는 관리자는 접근 가능
          if (userInfo.userType !== '연수생'
            || userInfo.cardinalNum?.toString() !== boardId.toString().slice(-2)) { // 기수가 해당 게시판 기수와 같지 않다면
            setMessage(`해당 게시판은 ${boardId.toString().slice(-2)}기만 이용할 수 있습니다.`)
            router.back()
          }
        }
      }
    }
  }, [userInfo])

  // 스크롤 위치 유지
  useKeepScrolling(infinitePostsScrollY)

  // boardName 구하기
  useEffect(() => {
    const tempBoardName: string | undefined = userAccessibleBoardInfo.listVerForPcHeader.find(boardInfo => boardInfo.boardId === boardId)?.name
    if (!!tempBoardName) {
      setBoardName(tempBoardName)
    }
  }, [userAccessibleBoardInfo, boardId])

  // 현재 보고 있는 게시판이 연수생 관련 게시판인지 확인하기
  useEffect(() => {
    if (!!userInfo && boardId === TRAINEE_BOARD_ID &&
      userInfo.userType === '연수생' && userInfo.cardinalNum === THIS_YEAR_CARDINAL_NUM) {
      setIsTraineeBoard(true)
    } else {
      setIsTraineeBoard(false)
    }
  }, [userInfo, boardId])

  return (
    <MainContainer>
      {!!boardName &&
        <>
          {isTraineeBoard ? (
            <SEO title={`${boardName} - ${traineeBoardInfoList.find(boardInfo => boardInfo.boardId === traineeBoardIdOfLastViewed)?.name} : 게시판`} />
          ) : (
            <SEO title={`${boardName} : 게시판`} />
          )}
        </>
      }

      {/* 모바일 헤더 */}
      <MobileBoardSearchHeader
        boardId={boardId}
        boardName={boardName}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* PC 헤더 */}
      <nav className='hidden fixed top-14 inset-x-0 pt-8 pb-2 text-center bg-zinc-900 z-50 lg:block'>
        <div className='w-full mainWidthLimit flex items-center space-x-8 overflow-scroll hide-scrollbar'>
          {userAccessibleBoardInfo.listVerForPcHeader.map((boardInfo) =>
            <div
              key={boardInfo.boardId}
              className='h-[2.125rem] flex flex-col items-center justify-between whitespace-nowrap'
            >
              <Link
                href={`/board/${boardInfo.boardId}`}
                className={'text-base font-semibold' + (boardId === boardInfo.boardId ? ' text-white' : ' text-gray-500')}
              >
                {boardInfo.name}
              </Link>
              <div className={'w-full h-0.5 bg-white ' + (boardId === boardInfo.boardId ? ' block' : ' hidden')}></div>
            </div>
          )}
        </div>
      </nav>

      <MainArea className='min-h-screen pb-8 flex flex-col lg:pt-[8.125rem] lg:pb-[6.25rem]'>
        {(isTraineeBoard) ? ( // 연수생 게시판
          <>
            {/* 연수생 게시판 NavBar */}
            <nav className='pt-4 px-5 pb-px flex space-x-6 overflow-scroll hide-scrollbar lg:px-0 lg:py-6'>
              {traineeBoardInfoList.map((boardInfo) =>
                <div
                  key={boardInfo.boardId}
                  className='h-[2.0625rem] flex flex-col items-center justify-between whitespace-nowrap lg:h-auto'
                >
                  <button
                    onClick={() => setTraineeBoardIdOfLastViewed(boardInfo.boardId)}
                    className={'text-base font-medium lg:px-4 lg:py-2 lg:text-lg' + (boardInfo.boardId === traineeBoardIdOfLastViewed ? ' text-gray-700 lg:text-white lg:bg-zinc-700 lg:rounded-lg' : ' text-gray-400')}
                  >
                    {boardInfo.name}
                  </button>
                  <div className={'w-full h-0.5 rounded-t-full bg-gray-700 lg:hidden' + (boardInfo.boardId === traineeBoardIdOfLastViewed ? ' block' : ' hidden')}></div>
                </div>
              )}
            </nav>

            {/* 팀원 모집 배너 */}
            {traineeBoardIdOfLastViewed === TRAINEE_BOARD_ID &&
              <button
                onClick={() => setTraineeBoardIdOfLastViewed(11)}
                className='w-full'
              >
                <Image
                  src={(window.innerWidth < 1024 ? traineeBoardBanner : pcTraineeBoardBanner)}
                  className='w-full h-auto'
                  alt='팀원 모집 배너'
                />
              </button>
            }

            {/* 게시글 무한 스크롤 영역 */}
            <InfiniteTraineePostListSection userId={userInfo!.userId} />

            {/* 글쓰기 버튼 */}
            <Link
              href={{
                pathname: `/board/${traineeBoardIdOfLastViewed}/addPost`,
                query: {
                  boardName: `${boardName} - ${traineeBoardInfoList.find(boardInfo => boardInfo.boardId === traineeBoardIdOfLastViewed)?.name}`
                }
              }}
              className={'fixed bottom-6 right-6' +
                ((traineeBoardIdOfLastViewed === 10 && !(userInfo?.userType === '관리자' || userInfo?.userType === '사무국')) ? ' hidden' : ' inline')} // 공지사항 게시판은 관리자나 사무국만 글을 쓸 수 있음
            >
              <div className='px-3 py-3 flex items-center justify-center rounded-full bg-blue-500 drop-shadow-FAB'>
                <Mode className='!w-6 !h-6 text-white' />
              </div>
            </Link>
          </>
        ) : ( // 나머지 게시판 (연수생 게시판 외 다른 게시판들)
          <>
            {/* 소마인 인증 유도 배너 */}
            {(boardId === 4 && !userInfo?.isCertified) &&
              <Link
                href='/profile/certification'
                className='w-full'
              >
                <Image
                  src={(window.innerWidth < 1024 ? prepStudentBoardBanner : pcPrepStudentBoardBanner)}
                  className='w-full h-auto'
                  alt='소마인 인증 배너'
                />
              </Link>
            }

            {/* 게시글 무한 스크롤 영역 */}
            {!!userInfo &&
             <InfinitePostListSection boardId={boardId} userId={userInfo.userId} />
            }

            {/* 글쓰기 버튼 */}
            {!!boardName &&
              <Link
                href={{
                  pathname: `/board/${boardId}/addPost`,
                  query: {
                    boardName: boardName
                  }
                }}
                className='fixed bottom-6 right-6'
              >
                <div className='px-3 py-3 flex items-center justify-center rounded-full bg-blue-500 drop-shadow-FAB'>
                  <Mode className='w-6 h-6 text-white' />
                </div>
              </Link>
            }
          </>
        )}
      </MainArea>
    </MainContainer>
  )
}

export default BoardDetail