import Link from 'next/link'
import { UserType } from '../../utils/types/userType'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import { useMainPageScrollYStore } from '../../stores/scrollStore/scrollStores'

interface Props {
  postId: number
  title: string
  userType: UserType
  cardinalNum: number | null
  isAnonymous: boolean
  commentsNum: number
  createdAt: string
}

function RecentPostPreview({ postId, title, userType, cardinalNum, isAnonymous, commentsNum, createdAt }: Props) {
  const setMainPageScrollY = useMainPageScrollYStore(state => state.setMainPageScrollY)

  return (
    <Link
      href={`/post/${postId}`}
      onClick={() => setMainPageScrollY(window.scrollY)}  // 클릭할 때 window.scrollY 저장
    >
      <div className='w-[13.125rem] h-[8.875rem] px-3.5 py-3 flex flex-col justify-between rounded-xl bg-blue-50 lg:w-[15.75rem] lg:h-[9.875rem]'>
        <div className='space-y-2.5'>
          {/* TODO: 게시판 값 연결해야함 */}
          <span className='px-1.5 py-1 bg-blue-100 rounded text-xs font-semibold text-blue-500 lg:text-sm'>
            13기 수료생 게시판
          </span>
          <p className='text-sm font-medium text-gray-800 truncate lg:text-base'>{title}</p>
        </div>
        <footer className='w-full flex items-center justify-between'>
          <p className='text-sm font-medium text-gray-500 lg:text-base'>{getElapsedTime(dayjs(createdAt))}</p>
          <span className='px-2 py-1 rounded bg-white'>
            <p className='text-sm font-semibold text-blue-700 lg:text-base'>답변 {commentsNum}</p>
          </span>
        </footer>
      </div>
    </Link>
  )
}

export default RecentPostPreview