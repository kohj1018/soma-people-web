import MainContainer from '../../../components/layout/MainContainer'
import MainArea from '../../../components/layout/MainArea'
import MobileCenterTitleHeader from '../../../components/layout/mobileHeader/MobileCenterTitleHeader'
import useSignInInfo from '../../../hooks/useSignInInfo'
import { usePostsWrittenByUserScrollYStore } from '../../../stores/scrollStore/scrollStores'
import useKeepScrolling from '../../../hooks/useKeepScrolling'
import dynamic from 'next/dynamic'
import LoadingCircular from '../../../components/layout/LoadingCircular'
const WrittenByUserPostListSection = dynamic(() => import('../../../components/common/WrittenByUserPostListSection'), {loading: () => <LoadingCircular />, ssr: false})

const PostsRecord = () => {
  const { userId } = useSignInInfo()
  const { postsWrittenByUserScrollY, setPostsWrittenByUserScrollY } = usePostsWrittenByUserScrollYStore()

  // 스크롤 위치 유지
  useKeepScrolling(postsWrittenByUserScrollY)

  return (
    <MainContainer>
      <MobileCenterTitleHeader title='작성한 글' />

      <MainArea className='px-5'>
        <WrittenByUserPostListSection
          userId={userId}
          setPostsWrittenByUserScrollY={setPostsWrittenByUserScrollY}
        />
      </MainArea>
    </MainContainer>
  )
}

export default PostsRecord

