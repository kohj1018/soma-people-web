import { NextPage } from 'next'
import MainContainer from '../../../components/layout/MainContainer'
import MobileBoardSearchHeader from '../../../components/layout/mobileHeader/MobileBoardSearchHeader'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useUserInfo from '../../../hooks/useUserInfo'
import useUserAccessibleBoardInfo from '../../../hooks/useUserAccessibleBoardInfo'
import Link from 'next/link'
import MainArea from '../../../components/layout/MainArea'
import { THIS_YEAR_CARDINAL_NUM, traineeBoardInfoList } from '../../../utils/config'
import dynamic from 'next/dynamic'
import LoadingCircular from '../../../components/layout/LoadingCircular'
import Image from 'next/image'
import traineeBoardBanner from '../../../public/banner/traineeBoardBanner.svg'
import pcTraineeBoardBanner from '../../../public/banner/pcTraineeBoardBanner.svg'
import { useTraineeBoardIdOfLastViewedStore } from '../../../stores/stores'
const InfiniteTraineePostListSection = dynamic(() => import('../../../components/common/InfiniteTraineePostListSection'), {loading: () => <LoadingCircular />, ssr: false})

const BoardDetail: NextPage = () => {
  const router = useRouter()
  const boardId: number = parseInt(router.query.boardId as string)
  const boardName: string = router.query.boardName as string
  const userInfo = useUserInfo()
  const userAccessibleBoardInfo = useUserAccessibleBoardInfo(userInfo)
  const { traineeBoardIdOfLastViewed, setTraineeBoardIdOfLastViewed } = useTraineeBoardIdOfLastViewedStore()
  const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <MainContainer>
      {/* 모바일 헤더 */}
      <MobileBoardSearchHeader
        boardId={boardId}
        boardName={boardName}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* PC 헤더 */}
      <nav className='hidden fixed top-14 inset-x-0 pt-8 pb-2 text-center bg-zinc-900 z-50 lg:block'>
        <div className='w-full mainWidthLimit flex items-center space-x-8'>
          {userAccessibleBoardInfo.listVerForPcHeader.map((boardInfo) =>
            <div key={boardInfo.boardId} className='h-[2.125rem] flex flex-col items-center justify-between'>
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

      <MainArea className='pb-8 lg:pt-[8.125rem] lg:pb-[6.25rem]'>
        {(userInfo?.userType === '연수생' && userInfo.cardinalNum === THIS_YEAR_CARDINAL_NUM) ? (
          <>
            <nav className='pt-4 px-5 pb-px flex space-x-6 lg:px-0 lg:py-6'>
              {traineeBoardInfoList.map((boardInfo) =>
                <div
                  key={boardInfo.boardId}
                  className='h-[2.0625rem] flex flex-col items-center justify-between lg:h-auto'
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

            {userInfo.isCertified &&
              <Link
                href='/profile/certification'
                className='w-full'
              >
                <Image
                  src={(window.innerWidth < 1024 ? traineeBoardBanner : pcTraineeBoardBanner)}
                  className='w-full h-auto'
                  alt=''
                />
              </Link>
            }

            <InfiniteTraineePostListSection userId={userInfo.userId} isCertified={userInfo.isCertified} />
          </>
        ) : (
          // TODO: 여기 다른 게시판 만들어야됨
          <></>
        )}
      </MainArea>
    </MainContainer>
  )
}

export default BoardDetail