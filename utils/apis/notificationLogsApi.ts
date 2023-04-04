import { NotificationLogInfoType } from '../types/responseTypes'
import { ec2 } from './apiConfig'

/** 유저가 받은 알림 기록 모두 불러오기 */
export const getAllNotificationLog = async (userId: number): Promise<NotificationLogInfoType[]> => {
  const res = await ec2.get<NotificationLogInfoType[]>(`/notificationLogs/getAllNotificationLog/${userId}`)
  return res.data
}

/** 알림 확인 완료 */
export const checkNotificationLog = (notificationLogId: number) => ec2.put(`/notificationLogs/checkNotificationLog/${notificationLogId}`)

/** 알림 기록 삭제하기 */
export const deleteNotificationLog = (notificationLogId: number) => ec2.put(`/notificationLogs/deleteNotificationLog/${notificationLogId}`)