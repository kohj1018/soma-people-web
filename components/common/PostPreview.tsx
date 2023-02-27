import Link from 'next/link'
import { PostInfoType } from '../../utils/types/responseTypes'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import UserTypeTag from '../tag/UserTypeTag'
import QuestionAnswer from '@mui/icons-material/QuestionAnswer'
import { useInfinitePostsScrollYStore } from '../../stores/stores'

interface Props {
  postInfo: PostInfoType
}

function PostPreview({ postInfo }: Props) {
  const setInfinitePostsScrollY = useInfinitePostsScrollYStore(state => state.setInfinitePostsScrollY) // scrollY 세팅

  return (
    <Link
      href={`/post/${postInfo.postId}`}
      onClick={() => setInfinitePostsScrollY(window.scrollY)}  // 클릭할 때 window.scrollY 저장
    >
      <div className='py-4 space-y-3.5 bg-white border-b border-gray-100'>
        <article className='space-y-1.5 font-medium'>
          <header className='text-base text-gray-900 truncate'>{postInfo.title}</header>
          <p className='text-sm text-gray-500'>{postInfo.content}</p>
        </article>
        <footer className='w-full flex items-center justify-between'>
          <article className='flex items-center space-x-1.5'>
            <p className='text-sm font-medium text-gray-400'>{getElapsedTime(dayjs(postInfo.createdAt)) + ' · ' + (postInfo.isAnonymous ? '익명' : postInfo.user.name)}</p>
            <UserTypeTag userType={postInfo.user.userType} cardinalNum={postInfo.user.cardinalNum} isAnonymous={postInfo.isAnonymous} />
          </article>
          <div className='flex items-center space-x-1.5'>
            <QuestionAnswer className='!w-4 !h-4 text-gray-200' />
            <p className='text-sm font-semibold text-gray-500'>{postInfo.commentsNum}</p>
          </div>
        </footer>
      </div>
    </Link>
  )
}

export default PostPreview