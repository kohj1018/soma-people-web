import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { getPostInfoListInfinitely } from '../../utils/apis/postsApi'
import { useTraineeBoardIdOfLastViewedStore } from '../../stores/stores'
import { Fragment, useEffect, useRef } from 'react'
import PostPreview from './PostPreview'
import LoadingCircular from '../layout/LoadingCircular'
import { isNotEmptyArray } from '../../utils/functions/isNotEmptyArray'
import noPostsIcon from '../../public/icon/noPostsIcon.svg'
import Image from 'next/image'
import {
  ARBITRARY_LARGEST_LAST_QUESTIONPOST_ID,
  INFINITE_SCROLL_LOAD_SIZE,
  REFERENCE_VALUE_TO_SWIPE,
} from '../../utils/constants/systemConstants'
import { useUserHiddenPostIdListStore } from '../../stores/localStorageStore/stores'
import PullToRefresh from 'react-simple-pull-to-refresh';
import { traineeBoardInfoList } from '../../utils/config'

interface Props {
  userId: number
  isCertified: boolean
}

function InfiniteTraineePostListSection({ userId, isCertified }: Props) {
  const infinitePostListSectionRef = useRef<HTMLDivElement>(null)
  const { traineeBoardIdOfLastViewed, setTraineeBoardIdOfLastViewed } = useTraineeBoardIdOfLastViewedStore()
  const { ref, inView } = useInView()
  const { data: postInfoList, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    postKeys.list(traineeBoardIdOfLastViewed, userId),
    ({ pageParam = ARBITRARY_LARGEST_LAST_QUESTIONPOST_ID }) => getPostInfoListInfinitely(traineeBoardIdOfLastViewed, pageParam, userId),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextLastPostId : undefined,
      staleTime: 30000
    }
  )
  const hiddenPostIdList = useUserHiddenPostIdListStore(state => state.hiddenPostIdList)

  // 스와이프 제스쳐 감지
  useEffect(() => {
    let touchstartX = 0
    let touchendX = 0
    let curBoardIdx = traineeBoardInfoList.findIndex(boardInfo => boardInfo.boardId === traineeBoardIdOfLastViewed)

    function handleStartTouch(e: TouchEvent) {
      touchstartX = e.changedTouches[0].screenX
    }

    function handleEndTouch(e: TouchEvent) {
      touchendX = e.changedTouches[0].screenX

      // Check Direction
      if (touchendX - touchstartX < -REFERENCE_VALUE_TO_SWIPE) {  // 왼쪽으로 스와이프
        if (curBoardIdx < traineeBoardInfoList.length - 1) {
          curBoardIdx += 1
          setTraineeBoardIdOfLastViewed(traineeBoardInfoList[curBoardIdx].boardId)
        }
      }
      if (touchendX - touchstartX > REFERENCE_VALUE_TO_SWIPE) {   // 오른쪽으로 스와이프
        if (curBoardIdx > 0) {
          curBoardIdx -= 1
          setTraineeBoardIdOfLastViewed(traineeBoardInfoList[curBoardIdx].boardId)
        }
      }
    }

    if (infinitePostListSectionRef.current) {
      infinitePostListSectionRef.current.addEventListener('touchstart', handleStartTouch)
      infinitePostListSectionRef.current.addEventListener('touchend', handleEndTouch)

      return () => {
        infinitePostListSectionRef.current?.removeEventListener('touchstart', handleStartTouch)
        infinitePostListSectionRef.current?.removeEventListener('touchend', handleEndTouch)
      }
    }
  }, [infinitePostListSectionRef])


  // 바닥에 닿으면 새로 불러오기
  useEffect(() => {
    if (!!userId && inView) {
      if (!!postInfoList && postInfoList.pages[postInfoList.pages.length - 1].postList.length > INFINITE_SCROLL_LOAD_SIZE - 1) {  // 처음 글이 없을 때 invalidateQueries 안먹히는거 해결하는 부분
        fetchNextPage()
      }
    }
  }, [inView])

  return (
    <>
      <section
        ref={infinitePostListSectionRef}
        className='mt-0 px-5 min-h-[80vh] lg:px-0 lg:mt-4'  //TODO: 일단 임시로 min-h-[80vh] 하긴 했는데 더 좋은 방법 있으면 바꾸기 (글이 없을 때 영역 차지를 안해서 스와이프가 안되고 있음)
      >
        {isNotEmptyArray(postInfoList?.pages[0].postList) ? (
          <PullToRefresh onRefresh={() => refetch()}>
            <>
              {postInfoList?.pages.map((page, index) => (
                <Fragment key={index}>
                  {page.postList.map((postInfo) => {
                    if (!hiddenPostIdList.includes(postInfo.postId)) {
                      return <PostPreview key={postInfo.postId} postInfo={postInfo} />
                    }
                    return <></>
                  })}
                </Fragment>
              ))}
            </>
          </PullToRefresh>
        ) : (
          <div className='moveToCenter flex flex-col items-center space-y-5'>
            <Image
              src={noPostsIcon}
              className='w-[3.75rem] h-[3.75rem]'
              alt='게시글 없음 표시 아이콘'
            />
            <p className='text-base font-semibold text-gray-400'>첫 글을 작성해주세요</p>
          </div>
        )}
      </section>

      {/* 무한 스크롤 옵저버 */}
      {isFetchingNextPage ? <LoadingCircular /> : <div ref={ref}></div>}
    </>
  )
}

export default InfiniteTraineePostListSection