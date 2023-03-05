import Link from 'next/link'
import UserTypeTag from '../tag/UserTypeTag'
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

function QnAPreview({ postId, title, userType, cardinalNum, isAnonymous, commentsNum, createdAt }: Props) {
  const setMainPageScrollY = useMainPageScrollYStore(state => state.setMainPageScrollY)

  return (
    <Link
      href={`/post/${postId}`}
      onClick={() => setMainPageScrollY(window.scrollY)}  // 클릭할 때 window.scrollY 저장
    >
      <div className='w-[13.1875rem] h-[8.875rem] px-3.5 py-3 flex flex-col justify-between rounded-sm bg-gray-50'>
        <div className='space-y-2.5'>
          <UserTypeTag userType={userType} cardinalNum={cardinalNum} isAnonymous={isAnonymous} />
          <p className='text-sm font-medium text-gray-700 ellipsisTwoLine'>{title}</p>
        </div>
        <footer className='w-full flex items-center justify-between'>
          <p className='text-sm font-medium text-gray-400'>{getElapsedTime(dayjs(createdAt))}</p>
          <span className='px-2 py-1 rounded bg-gray-100'>
            <p className='text-sm font-semibold text-blue-700'>답변 {commentsNum}</p>
          </span>
        </footer>
      </div>
    </Link>
  )
}

export default QnAPreview