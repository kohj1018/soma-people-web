import { NextRouter, useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { getPostInfoListByUser } from '../../utils/apis/postsApi'
import { PostInfoType } from '../../utils/types/responseTypes'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import QuestionAnswer from '@mui/icons-material/QuestionAnswer'

interface ListProps {
  userId: number | null
  setPostsWrittenByUserScrollY: (postsWrittenByUserScrollY: number) => void
}

function WrittenByUserPostListSection({ userId, setPostsWrittenByUserScrollY }: ListProps) {
  const router = useRouter()
  const { data: postsInfoList } = useQuery(
    postKeys.postsWrittenByUser(userId ?? 0),
    () => getPostInfoListByUser(userId ?? 0),
    {
      enabled: !!userId
    }
  )

  return (
    <section className='mt-4 pb-7'>
      {postsInfoList?.map((postInfo) =>
        <PostPreviewWrittenByUser
          key={postInfo.postId}
          router={router}
          postInfo={postInfo}
          setPostsWrittenByUserScrollY={setPostsWrittenByUserScrollY}
        />
      )}
    </section>
  )
}

export default WrittenByUserPostListSection



interface PreviewProps {
  router: NextRouter
  postInfo: PostInfoType
  setPostsWrittenByUserScrollY: (postsWrittenByUserScrollY: number) => void
}
function PostPreviewWrittenByUser({ router, postInfo, setPostsWrittenByUserScrollY }: PreviewProps) {
  const goToPost = () => {
    setPostsWrittenByUserScrollY(window.scrollY)
    router.push(`/post/${postInfo.postId}`)
  }

  return (
    <button
      onClick={goToPost}
      className='block w-full py-4 space-y-3.5 text-left bg-white border-b border-gray-100'
    >
      <article className='space-y-1.5 font-medium'>
        <header className='text-base text-gray-900'>{postInfo.title}</header>
        <p className='text-sm text-gray-500'>{postInfo.content}</p>
      </article>
      <div className='w-full flex items-center justify-between'>
        <p className='text-sm font-medium text-gray-400'>{getElapsedTime(dayjs(postInfo.createdAt))}</p>
        <div className='flex items-center space-x-1.5'>
          <QuestionAnswer className='!w-4 !h-4 text-gray-200' />
          <p className='text-sm font-semibold text-gray-500'>{postInfo.commentsNum}</p>
        </div>
      </div>
    </button>
  )
}