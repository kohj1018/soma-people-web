import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { ARBITRARY_LARGEST_LAST_QUESTIONPOST_ID } from '../../utils/config'
import { getPostInfoListInfinitely } from '../../utils/apis/postsApi'
import { useBoardIdOfLastViewedStore, useScrollYStore } from '../../stores/stores'
import { Fragment, useEffect } from 'react'
import PostPreview from './PostPreview'
import LoadingCircular from '../layout/LoadingCircular'

interface Props {
  userId: number | null
}

function InfinitePostListSection({ userId }: Props) {
  const boardIdOfLastViewed = useBoardIdOfLastViewedStore(state => state.boardIdOfLastViewed)
  const { ref, inView } = useInView()
  const { data: postInfoList, fetchNextPage, isFetchingNextPage, isRefetching } = useInfiniteQuery(
    postKeys.list(boardIdOfLastViewed, userId ?? 1),
    ({ pageParam = ARBITRARY_LARGEST_LAST_QUESTIONPOST_ID }) => getPostInfoListInfinitely(boardIdOfLastViewed, pageParam, userId ?? 1),
    {
      enabled: !!userId,
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextLastPostId : undefined,
      staleTime: 30000,
      cacheTime: Infinity
    }
  )
  const scrollY = useScrollYStore(state => state.scrollY) // 스크롤 위치 저장

  // useEffect(() => {  //TODO : 자유게시판은 글 수정/삭제했을 때 바로 반영이 되는데 나머지 게시판만 invalidateQueries가 안먹힘. 추후 수정해야할듯
  //   console.log("key : ", postKeys.list(boardIdOfLastViewed, userId ?? 1))
  //   console.log("isRefetching : ", isRefetching)
  //   console.log("postInfoList : ", postInfoList)
  //   console.log("--------------------------------------------------")
  // }, [isRefetching])

  // 바닥에 닿으면 새로 불러오기
  useEffect(() => {
    if (!!userId && inView) fetchNextPage()
  }, [inView])

  // 스크롤 위치 유지
  useEffect(() => {
    // 기본값이 0이기 때문에 스크롤 값이 저장됐을 때에만 window를 스크롤 시킴
    if (scrollY !== 0) window.scrollTo(0, scrollY)
  }, [])

  return (
    <>
      <section className='mt-[3.125rem] px-5 py-4'>
        {postInfoList?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.postList.map((postInfo) =>
              <PostPreview key={postInfo.postId} postInfo={postInfo} />
            )}
          </Fragment>
        ))}
      </section>

      {/* 무한 스크롤 옵저버 */}
      {isFetchingNextPage ? <LoadingCircular /> : <div ref={ref}></div>}
    </>
  )
}

export default InfinitePostListSection