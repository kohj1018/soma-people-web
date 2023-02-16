import { UserInfoType } from '../types/responseTypes'
import { ec2 } from './apiConfig'

/** userId로 유저 정보 불러오기 */
export const getUserInfoByUserId = async (userId: number): Promise<UserInfoType> => {
  const res = await ec2.get<UserInfoType>(`/users/${userId}`)
  return res.data
}