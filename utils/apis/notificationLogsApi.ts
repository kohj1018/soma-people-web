import { NotificationLogInfoType } from '../types/responseTypes'
import { ec2 } from './apiConfig'
import { INFINITE_SCROLL_LOAD_SIZE } from '../constants/systemConstants'
import { AddAnnounceNotificationLogType } from '../types/addRequestTypes'

/** 유저가 받은 알림 기록 모두 불러오기 */
export const getNotificationLogInfoListInfinitely = async (userId: number, lastNotificationLogId: number) => {
  const res = await ec2.get<NotificationLogInfoType[]>(`/notificationLogs?userId=${userId}&lastNotificationLogId=${lastNotificationLogId}&size=${INFINITE_SCROLL_LOAD_SIZE}`)
  const notificationLogList: NotificationLogInfoType[] = res.data
  return { notificationLogList, nextLastNotificationLogId: notificationLogList[notificationLogList.length - 1]?.notificationLogId, isLast: notificationLogList.length < INFINITE_SCROLL_LOAD_SIZE }
}

/** 모두에게 알림 기록 남기기 (ex. 소마인 공지사항) */
export const leaveNotificationLogForAll = (addAnnounceNotificationLogRequest: AddAnnounceNotificationLogType) => ec2.post('/leaveNotificationLogForAll', addAnnounceNotificationLogRequest)

/** 알림 확인 완료 */
export const checkNotificationLog = (notificationLogId: number) => ec2.put(`/notificationLogs/checkNotificationLog/${notificationLogId}`)

/** 알림 기록 삭제하기 */
export const deleteNotificationLog = (notificationLogId: number) => ec2.put(`/notificationLogs/deleteNotificationLog/${notificationLogId}`)