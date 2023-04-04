import { NotificationLogInfoType } from '../../utils/types/responseTypes'
import Link from 'next/link'
import { NotificationType } from '../../utils/types/notificationType'
import Campaign from '@mui/icons-material/Campaign'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'

interface Props {
  notificationLogInfo: NotificationLogInfoType
}

function NotificationLog({ notificationLogInfo }: Props) {

  if (notificationLogInfo.notificationType === '공지사항') {
    return (
      <CustomNotificationLog notificationLogInfo={notificationLogInfo} bgColor='bg-red-50' />
    )
  } else if (!notificationLogInfo.isChecked) {
    return (
      <CustomNotificationLog notificationLogInfo={notificationLogInfo} bgColor='bg-blue-50' />
    )
  } else {
    return (
      <CustomNotificationLog notificationLogInfo={notificationLogInfo} bgColor='bg-gray-50' />
    )
  }
}

export default NotificationLog

interface CustomNotificationLogProps {
  notificationLogInfo: NotificationLogInfoType
  bgColor: string
}
function CustomNotificationLog({ notificationLogInfo, bgColor }: CustomNotificationLogProps) {
  return (
    <Link
      href={`/post/${notificationLogInfo.postId}`}
      className={'px-6 py-4 ' + bgColor}
    >
      <BoardNameTag boardName={notificationLogInfo.boardName} notificationType={notificationLogInfo.notificationType} />
      <p className='mt-2 text-base font-medium text-gray-900'>{notificationLogInfo.content}</p>
      <p className='mt-4 text-sm font-semibold text-gray-500'>{getElapsedTime(dayjs(notificationLogInfo.createdAt))}</p>
    </Link>
  )
}

interface BoardNameTagProps {
  boardName: string
  notificationType: NotificationType
}
function BoardNameTag({ boardName, notificationType }: BoardNameTagProps) {
  if (notificationType === '공지사항') {
    return (
      <span className='px-1.5 py-1 flex items-center space-x-1 bg-red-100'>
        <Campaign className='!w-4 !h-4 text-red-500' />
        <p className='text-sm font-semibold text-red-500'>{boardName}</p>
      </span>
    )
  } else {
    return (
      <span className='px-1.5 py-1 bg-blue-100'>
        <p className='text-sm font-semibold text-blue-500'>{boardName}</p>
      </span>
    )
  }
}