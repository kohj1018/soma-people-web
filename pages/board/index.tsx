import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import { useBoardIdOfLastViewedStore, useSnackbarOpenStore } from '../../stores/stores'
import MobileBoardSearchHeader from '../../components/layout/mobileHeader/MobileBoardSearchHeader'
import { useEffect, useState } from 'react'
import MobileBoardTap from '../../components/layout/mobileHeader/MobileBoardTap'
import useUserAccessibleBoardInfo from '../../hooks/useUserAccessibleBoardInfo'
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
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { isNotEmptyArray } from '../../utils/functions/isNotEmptyArray'
import Image, { StaticImageData } from 'next/image'
import freeBoardIcon from '../../public/icon/boardIcon/freeBoardIcon.png'
import employmentIcon from '../../public/icon/boardIcon/employmentIcon.png'
import graduationIcon from '../../public/icon/boardIcon/graduationIcon.png'
import mentorIcon from '../../public/icon/boardIcon/mentorIcon.png'
import prepStudentIcon from '../../public/icon/boardIcon/prepStudentIcon.png'
import traineeIcon from '../../public/icon/boardIcon/traineeIcon.png'
import { THIS_YEAR_CARDINAL_NUM } from '../../utils/config'
import { BoardInfoType } from '../../utils/types/responseTypes'
const InfinitePostListSection = dynamic(() => import('../../components/common/InfiniteTraineePostListSection'),{loading: () => <LoadingCircular />, ssr: false})

const Board: NextPage = () => {
  const userInfo = useUserInfo()
  const userAccessibleBoardInfo = useUserAccessibleBoardInfo(userInfo)
  const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <MainContainer>
      <SEO title='게시판' />

      {/* 게시판 검색 모바일 헤더 */}
      <MobileBoardSearchHeader
        boardId={0}
        boardName='통합'
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MainArea>
        {/* 유저 전용 게시판 모음 */}
        {isNotEmptyArray(userAccessibleBoardInfo.userOnly) &&
          <div className='mt-6 mb-8 px-5 space-y-3'>
            {userAccessibleBoardInfo.userOnly.map((boardInfo) => {
              let userOnlyBoardIcon: StaticImageData | null = null
              if (boardInfo.boardId === 100) {
                userOnlyBoardIcon = mentorIcon
              } else if (boardInfo.boardId > 100 && boardInfo.boardId < parseInt('1' + THIS_YEAR_CARDINAL_NUM)) {
                userOnlyBoardIcon = graduationIcon
              } else if (boardInfo.boardId === parseInt('1' + THIS_YEAR_CARDINAL_NUM)) {
                userOnlyBoardIcon = traineeIcon
              } else {
                return <></>
              }

              return (
                <BoardMenu
                  key={boardInfo.boardId}
                  boardInfo={boardInfo}
                  boardNameColor='text-white'
                  bgColor='bg-black'
                  icon={userOnlyBoardIcon}
                  iconBgColor='bg-white'
                />
              )
            })}
          </div>
        }

        <section className='px-5 py-8 space-y-8 rounded-t-[2rem] bg-gray-50'>
          {/* 인증자 게시판 모음 */}
          {isNotEmptyArray(userAccessibleBoardInfo.certificatedUserAll) &&
            <article className='space-y-4'>
              <header className='text-sm font-semibold text-gray-500'>인증자 게시판</header>
              <section className='space-y-3'>
                {userAccessibleBoardInfo.certificatedUserAll.map((boardInfo) => {
                  switch (boardInfo.boardId) {
                    case 1: // 자유게시판
                      return (
                        <BoardMenu
                          key={boardInfo.boardId}
                          boardInfo={boardInfo}
                          icon={freeBoardIcon}
                          iconBgColor='bg-slate-100'
                        />
                      )
                    case 2: // 스터디 모집 게시판
                      return (
                        <BoardMenu
                          key={boardInfo.boardId}
                          boardInfo={boardInfo}
                          icon={freeBoardIcon}
                          iconBgColor='bg-blue-100'
                        />
                      )
                    case 3: // 취업 정보 게시판
                      return (
                        <BoardMenu
                          key={boardInfo.boardId}
                          boardInfo={boardInfo}
                          icon={employmentIcon}
                          iconBgColor='bg-orange-100'
                        />
                      )
                    default:
                      return <></>
                  }
                })}
              </section>
            </article>
          }

          {/* 미인증자 게시판 모음 */}
          <article className='space-y-4'>
            <header className='text-sm font-semibold text-gray-500'>미인증자 게시판</header>
            <BoardMenu
              boardInfo={{boardId: 4, name: userAccessibleBoardInfo.unCertified[0]?.name}}
              icon={prepStudentIcon}
              iconBgColor='bg-emerald-50'
            />
          </article>
        </section>
      </MainArea>
    </MainContainer>
  )

  // const router = useRouter()
  // const { boardIdOfLastViewed, setBoardIdOfLastViewed } = useBoardIdOfLastViewedStore()
  // const [searchTerm, setSearchTerm] = useState<string>('')
  // const userInfo = useUserInfo()
  // const boardInfoList = useUserAccessibleBoardInfo(userInfo)
  // const [boardName, setBoardName] = useState<string>('')
  // const infinitePostsScrollY = useInfinitePostsScrollYStore(state => state.infinitePostsScrollY) // 스크롤 위치 저장
  // const { setMessage } = useSnackbarOpenStore()
  //
  // // Redirect 처리
  // useEffect(() => {
  //   if (!!userInfo) {
  //
  //     // 소마인 인증 안했는데 준비생 게시판 외 게시판 보는 경우
  //     if (boardIdOfLastViewed !== 4) {
  //       if (!userInfo.isCertified) {
  //         setMessage('해당 게시판은 프로필 탭에서 소마인 인증을 받은 후 이용할 수 있습니다.')
  //         router.back()
  //       }
  //     }
  //
  //     // 기수가 다른 경우
  //     if (boardIdOfLastViewed.toString().length === 3) {  // 수료생 or 연수생 게시판인 경우
  //       if (userInfo.userType !== '연수생'
  //         || userInfo.cardinalNum?.toString() !== boardIdOfLastViewed.toString().slice(-2)) // 기수가 해당 게시판 기수와 같지 않다면
  //       {
  //         setMessage(`해당 게시판은 ${boardIdOfLastViewed.toString().slice(-2)}기만 이용할 수 있습니다.`)
  //         router.back()
  //       }
  //     }
  //
  //   }
  //
  // }, [userInfo])
  //
  // useEffect(() => {
  //
  // }, [userInfo])
  //
  // // 스크롤 위치 유지
  // useKeepScrolling(infinitePostsScrollY)
  //
  // // boardName 구하기
  // useEffect(() => {
  //   if (!!boardInfoList) {
  //     const selectedBoard = boardInfoList.find((boardInfo) => boardInfo.boardId === boardIdOfLastViewed)
  //     if (!!selectedBoard) {
  //       setBoardName(selectedBoard.name)
  //     }
  //   }
  // }, [boardInfoList, boardIdOfLastViewed])
  //
  //
  // return (
  //   <MainContainer>
  //     {!!boardName &&
  //       <SEO title={`${boardName} : 게시판`} />
  //     }
  //
  //     {/* 검색 헤더 */}
  //     <MobileBoardSearchHeader
  //       boardId={boardIdOfLastViewed}
  //       boardName={boardName}
  //       searchTerm={searchTerm}
  //       setSearchTerm={setSearchTerm}
  //     />
  //
  //     {/* 게시판 탭 */}
  //     <MobileBoardTap
  //       boardInfoList={boardInfoList ?? []}
  //       boardIdOfLastViewed={boardIdOfLastViewed}
  //       setBoardIdOfLastViewed={setBoardIdOfLastViewed}
  //     />
  //
  //     <MainArea>
  //       {/* 게시글 무한 스크롤 영역 */}
  //       {!!userInfo &&
  //         <InfiniteTraineePostListSection userId={userInfo.userId} boardInfoList={boardInfoList} />
  //       }
  //
  //       {/* 글쓰기 버튼 */}
  //       {!!boardName &&
  //         <Link
  //           href={{
  //             pathname: `/board/${boardIdOfLastViewed}/addPost`,
  //             query: {
  //               boardId: boardIdOfLastViewed,
  //               boardName: boardName
  //             }
  //           }}
  //           className='fixed bottom-6 right-6'
  //         >
  //           <div className='px-3 py-3 flex items-center justify-center rounded-full bg-blue-500 drop-shadow-FAB'>
  //             <Mode className='w-6 h-6 text-white' />
  //           </div>
  //         </Link>
  //       }
  //     </MainArea>
  //   </MainContainer>
  // )
}

export default Board

interface BoardMenuProps {
  boardInfo: BoardInfoType
  boardNameColor?: string
  bgColor?: string
  icon: StaticImageData
  iconBgColor: string
  haveShadow?: boolean
}
function BoardMenu({ boardInfo, boardNameColor = 'text-gray-600', bgColor = 'bg-white', icon, iconBgColor, haveShadow = false }: BoardMenuProps) {
  return (
    <Link
      href={`/board/${boardInfo.boardId}`}
      className={'w-full px-4 py-2.5 flex items-center justify-between rounded-lg ' + bgColor + (haveShadow ? ' shadow-profileCard' : '')}
    >
      <div className='flex items-center space-x-4'>
        <div className={'w-10 h-10 flex items-center justify-center rounded-full ' + iconBgColor}>
          <Image
            src={icon}
            className='w-[1.1rem] h-auto'
            alt='게시판 아이콘'
          />
        </div>
        <p className={'text-lg font-medium ' + boardNameColor}>{boardInfo.name}</p>
      </div>
      <KeyboardArrowRight className='!w-6 !h-6 text-zinc-600' />
    </Link>
  )
}

