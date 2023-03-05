import MainContainer from '../../../components/layout/MainContainer'
import MobileCenterTitleHeader from '../../../components/layout/mobileHeader/MobileCenterTitleHeader'
import MainArea from '../../../components/layout/MainArea'
import useSignInInfo from '../../../hooks/useSignInInfo'
import { useCommentsWrittenByUserScrollYStore } from '../../../stores/scrollStore/scrollStores'
import useKeepScrolling from '../../../hooks/useKeepScrolling'
import dynamic from 'next/dynamic'
import LoadingCircular from '../../../components/layout/LoadingCircular'
const WrittenByUserCommentListSection = dynamic(() => import('../../../components/common/WrittenByUserCommentListSection'), {loading: () => <LoadingCircular />, ssr: false})

const CommentsRecord = () => {
  const { userId } = useSignInInfo()
  const { commentsWrittenByUserScrollY, setCommentsWrittenByUserScrollY } = useCommentsWrittenByUserScrollYStore()

  // 스크롤 위치 유지
  useKeepScrolling(commentsWrittenByUserScrollY)

  return (
    <MainContainer>
      <MobileCenterTitleHeader title='작성한 댓글' />

      <MainArea className='px-5'>
        <WrittenByUserCommentListSection
          userId={userId}
          setCommentsWrittenByUserScrollY={setCommentsWrittenByUserScrollY}
        />
      </MainArea>
    </MainContainer>
  )
}

export default CommentsRecord