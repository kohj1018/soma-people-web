import { NextRouter, useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { getCommentInfoListByUser } from '../../utils/apis/commentsApi'
import { CommentInfoType } from '../../utils/types/responseTypes'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'

interface ListProps {
  userId: number | null
  setCommentsWrittenByUserScrollY: (commentsWrittenByUserScrollY: number) => void
}

function WrittenByUserCommentListSection({ userId, setCommentsWrittenByUserScrollY }: ListProps) {
  const router = useRouter()
  const { data: commentsInfoList } = useQuery(
    postKeys.commentsWrittenByUser(userId ?? 0),
    () => getCommentInfoListByUser(userId ?? 0),
    {
      enabled: !!userId
    }
  )

  return (
    <section className='mt-4 pb-7'>
      {commentsInfoList?.map((commentInfo) =>
        <CommentPreviewWrittenByUser
          key={commentInfo.commentId}
          router={router}
          commentInfo={commentInfo}
          setCommentsWrittenByUserScrollY={setCommentsWrittenByUserScrollY}
        />
      )}
    </section>
  )
}

export default WrittenByUserCommentListSection



interface PreviewProps {
  router: NextRouter
  commentInfo: CommentInfoType
  setCommentsWrittenByUserScrollY: (commentsWrittenByUserScrollY: number) => void
}
function CommentPreviewWrittenByUser({ router, commentInfo, setCommentsWrittenByUserScrollY }: PreviewProps) {
  const goToComment = () => {
    setCommentsWrittenByUserScrollY(window.scrollY)
    router.push(`/post/${commentInfo.postId}`)
  }

  return (
    <button
      onClick={goToComment}
      className='block w-full py-4 space-y-3.5 text-left bg-white border-b border-gray-100'
    >
      <p className='text-base font-medium text-gray-900'>{commentInfo.content}</p>
      <p className='text-sm font-medium text-gray-400'>{getElapsedTime(dayjs(commentInfo.createdAt))}</p>
    </button>
  )
}