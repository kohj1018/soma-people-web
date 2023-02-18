import { ec2 } from './apiConfig'
import { UserInfoType } from '../types/responseTypes'
import { AddBlockUserLogType } from '../types/addRequestTypes'

/** 차단한 유저 모두 불러오기 */
export const getAllBlockUserInfo = async (userId: number): Promise<UserInfoType[]> => {
  const res = await ec2.get<UserInfoType[]>(`/blockUserLogs/getAllBlockUsers/${userId}`)
  return res.data
}

/** 유저 차단하기 */
export const addBlockUserLog = (addBlockUserLogRequest: AddBlockUserLogType) => ec2.post('/blockUserLogs', addBlockUserLogRequest)

/** 유저 차단 해제하기 */
export const deleteBlockUserLog = (userId: number, blockUserId: number) => ec2.delete(`/blockUserLogs?userId=${userId}&blockUserId=${blockUserId}`)