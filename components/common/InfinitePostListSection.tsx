import { useInView } from 'react-intersection-observer'
import {
  ARBITRARY_LARGEST_LAST_QUESTIONPOST_ID,
  INFINITE_SCROLL_LOAD_SIZE,
} from '../../utils/constants/systemConstants'
import { useUserHiddenPostIdListStore } from '../../stores/localStorageStore/stores'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getPostInfoListInfinitely } from '../../utils/apis/postsApi'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { Fragment, useEffect } from 'react'
import LoadingCircular from '../layout/LoadingCircular'
import { isNotEmptyArray } from '../../utils/functions/isNotEmptyArray'
import PullToRefresh from 'react-simple-pull-to-refresh'
import PostPreview from './PostPreview'
import Image from 'next/image'
import noPostsIcon from '../../public/icon/noPostsIcon.svg'

interface Props {
  boardId: number
  userId: number
}

function InfinitePostListSection({ boardId, userId }: Props) {
  const { ref, inView } = useInView()
  const { data: postInfoList, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    postKeys.list(boardId, userId),
    ({ pageParam = ARBITRARY_LARGEST_LAST_QUESTIONPOST_ID }) => getPostInfoListInfinitely(boardId, pageParam, userId),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextLastPostId : undefined,
      staleTime: 30000
    }
  )
  const hiddenPostIdList = useUserHiddenPostIdListStore(state => state.hiddenPostIdList)

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
      <section className='mt-0 px-5 min-h-[80vh] lg:px-0 lg:mt-4'>
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

export default InfinitePostListSection