import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { ARBITRARY_LARGEST_LAST_QUESTIONPOST_ID } from '../../utils/config'
import { getPostInfoListInfinitely } from '../../utils/apis/postsApi'
import { useBoardIdOfLastViewedStore } from '../../stores/stores'
import { Fragment, useEffect } from 'react'
import PostPreview from './PostPreview'
import LoadingCircular from '../layout/LoadingCircular'
import { isNotEmptyArray } from '../../utils/functions/isNotEmptyArray'
import noPostsIcon from '../../public/icon/noPostsIcon.svg'
import Image from 'next/image'

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

  return (
    <>
      <section className='mt-[3.125rem] px-5 py-4'>
        {isNotEmptyArray(postInfoList?.pages[0].postList) ? (
          postInfoList?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.postList.map((postInfo) =>
                <PostPreview key={postInfo.postId} postInfo={postInfo} />
              )}
            </Fragment>
          ))
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

export default InfinitePostListSection