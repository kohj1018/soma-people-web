import Link from 'next/link'
import { PostInfoType } from '../../utils/types/responseTypes'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import UserTypeTag from '../tag/UserTypeTag'
import QuestionAnswer from '@mui/icons-material/QuestionAnswer'
import { useInfinitePostsScrollYStore } from '../../stores/scrollStore/scrollStores'

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
      <article className='py-4 space-y-3.5 bg-white border-b border-gray-100 lg:py-6'>
        {/* 글 내용 부분 (제목, 본문) */}
        <article className='space-y-1.5 font-medium'>
          <header className='text-base text-gray-900 truncate lg:text-lg'>{postInfo.title}</header>
          <p className='text-sm text-gray-500 truncate lg:text-base'>{postInfo.content}</p>
        </article>

        {/* 글 정보 (작성시간, 작성자 정보, 댓글 수) */}
        <footer className='w-full flex items-center justify-between'>
          <article className='flex items-center space-x-1.5'>
            <p className='text-sm font-medium text-gray-400 lg:text-base'>{getElapsedTime(dayjs(postInfo.createdAt)) + ' · ' + (postInfo.isAnonymous ? '익명' : postInfo.user.name)}</p>
            <UserTypeTag userType={postInfo.user.userType} cardinalNum={postInfo.user.cardinalNum} isAnonymous={postInfo.isAnonymous} />
          </article>
          <div className='flex items-center space-x-1.5'>
            <QuestionAnswer className='!w-4 !h-4 text-gray-200 lg:!w-5 lg:!h-5' />
            <p className='text-sm font-semibold text-gray-500 lg:text-base'>{postInfo.commentsNum}</p>
          </div>
        </footer>
      </article>
    </Link>
  )
}

export default PostPreview