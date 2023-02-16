import { UserType } from './userType'

export interface UserInfoType {
  userId: number
  name: string
  userType: UserType
  cardinalNum: number | null
  isCertified: boolean
  isDelete: boolean
  createdAt: string
  updatedAt: string | null
}