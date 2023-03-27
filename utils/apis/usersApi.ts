import { UserInfoType } from '../types/responseTypes'
import { ec2 } from './apiConfig'
import { UpdateFirebaseToken, UpdateUserType } from '../types/updateRequestTypes'
import { AddUserType } from '../types/addRequestTypes'

/** userId로 유저 정보 불러오기 */
export const getUserInfoByUserId = async (userId: number): Promise<UserInfoType> => {
  const res = await ec2.get<UserInfoType>(`/users/${userId}`)
  return res.data
}

/** oauthId로 userId 불러오기 */
export const getUserIdByOauthId = async (oauthId: string): Promise<number> => {
  const res = await ec2.get<number>(`/users/findUserId/${oauthId}`)
  return res.data
}

/** 새 유저 추가하기 */
export const addUser = (addUserRequest: AddUserType) => ec2.post('/users', addUserRequest)

/** 유저 정보 수정하기 (oauthId 로만 가능) */
export const updateUserByOAuthId = (oauthId: string, updateUserRequest: UpdateUserType) => ec2.put(`/users/${oauthId}`, updateUserRequest)

/** firebaseToken 등록/수정 */
export const registerFirebaseToken = (userId: number, firebaseToken: UpdateFirebaseToken) => ec2.put(`/users/firebaseToken/${userId}`, firebaseToken)