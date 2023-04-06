import Link from 'next/link'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import { useMainPageScrollYStore } from '../../stores/scrollStore/scrollStores'
import { PostInfoType } from '../../utils/types/responseTypes'

interface Props {
  postInfo: PostInfoType
}

function RecentPostPreview({ postInfo }: Props) {
  const setMainPageScrollY = useMainPageScrollYStore(state => state.setMainPageScrollY)

  return (
    <Link
      href={`/post/${postInfo.postId}`}
      onClick={() => setMainPageScrollY(window.scrollY)}  // 클릭할 때 window.scrollY 저장
    >
      <div className={'w-[13.125rem] h-[8.875rem] px-3.5 py-3 flex flex-col justify-between rounded-xl lg:w-[15.75rem] lg:h-[9.875rem] ' + ((postInfo.board.boardId === 1000 || postInfo.board.boardId === 10) ? ' bg-red-50' : ' bg-blue-50')}>
        <div className='space-y-2.5'>
          <span className={'px-1.5 py-1 rounded text-xs font-semibold lg:text-sm' + ((postInfo.board.boardId === 1000 || postInfo.board.boardId === 10) ? ' bg-red-100 text-red-500' : ' bg-blue-100 text-blue-500')}>
            {postInfo.board.name}
          </span>
          <p className='text-sm font-medium text-gray-800 truncate lg:text-base'>{postInfo.title}</p>
        </div>
        <footer className='w-full flex items-center justify-between'>
          <p className='text-sm font-medium text-gray-500 lg:text-base'>{getElapsedTime(dayjs(postInfo.createdAt))}</p>
          <span className='px-2 py-1 rounded bg-white'>
            <p className={'text-sm font-semibold lg:text-base' + ((postInfo.board.boardId === 1000 || postInfo.board.boardId === 10) ? ' text-gray-600' : ' text-blue-700')}>답변 {postInfo.commentsNum}</p>
          </span>
        </footer>
      </div>
    </Link>
  )
}

export default RecentPostPreview