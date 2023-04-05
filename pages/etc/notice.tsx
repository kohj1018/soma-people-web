import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import MainArea from '../../components/layout/MainArea'
import SEO from '../../components/SEO'
import MobileCenterTitleHeader from '../../components/layout/mobileHeader/MobileCenterTitleHeader'
import { useInfiniteQuery } from '@tanstack/react-query'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { ARBITRARY_LARGEST_LAST_ID } from '../../utils/constants/systemConstants'
import { getPostInfoListInfinitely } from '../../utils/apis/postsApi'
import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import PostPreview from '../../components/common/PostPreview'
import LoadingCircular from '../../components/layout/LoadingCircular'

const Notice: NextPage = () => {
  const { ref, inView } = useInView()
  const { data: postInfoList, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    postKeys.list(1000, 1),
    ({ pageParam = ARBITRARY_LARGEST_LAST_ID }) => getPostInfoListInfinitely(1000, pageParam, 1),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextLastPostId : undefined,
      staleTime: 60000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false
    }
  )

  // 바닥에 닿으면 새로 불러오기
  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])

  return (
    <MainContainer>
      <SEO title='소마인 공지사항' />

      <MobileCenterTitleHeader title='소마인 공지사항' />

      <MainArea className='px-5 pb-8 lg:px-0'>
        <section className='mt-4 lg:mt-8'>
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
      </MainArea>
    </MainContainer>
  )
}

export default Notice