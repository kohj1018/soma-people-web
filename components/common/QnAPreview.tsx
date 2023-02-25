import Link from 'next/link'
import UserTypeTag from '../tag/UserTypeTag'
import { UserType } from '../../utils/types/userType'

interface Props {
  title: string
  userType: UserType
  cardinalNum: number | null
  isAnonymous: boolean
  commentsNum: number
  createdAt: string
}

function QnAPreview({ title, userType, cardinalNum, isAnonymous, commentsNum, createdAt }: Props) {
  return (
    <Link
      href='/'
      className='block w-[13.1875rem] px-3.5 py-3 bg-gray-50'
    >
      <UserTypeTag userType={userType} cardinalNum={cardinalNum} isAnonymous={isAnonymous} />
      <p className='mt-2.5 text-sm font-medium text-gray-700 ellipsisTwoLine'>{title}</p>
      <footer className='mt-4 w-full flex items-center justify-between'>
        <p className='text-sm font-medium text-gray-400'>10초 전</p>
        <span className='px-2 py-1 bg-gray-100'>
          <p className='text-sm font-semibold text-blue-700'>답변 {commentsNum}</p>
        </span>
      </footer>
    </Link>
  )
}

export default QnAPreview