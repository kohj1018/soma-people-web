import { UserInfoType } from '../types/responseTypes'
import { ec2 } from './apiConfig'
import { UpdateUserType } from '../types/updateRequestTypes'
import { AddUserType } from '../types/addRequestTypes'

/** userId로 유저 정보 불러오기 */
export const getUserInfoByUserId = async (userId: number): Promise<UserInfoType> => {
  const res = await ec2.get<UserInfoType>(`/users/${userId}`)
  return res.data
}

/** 새 유저 추가하기 */
export const addUser = (addUserRequest: AddUserType) => ec2.post('/users', addUserRequest)

/** 유저 정보 수정하기 (oauthId 로만 가능) */
export const updateUserByOAuthId = (oauthId: string, updateUserRequest: UpdateUserType) => ec2.put(`/users/${oauthId}`, updateUserRequest)