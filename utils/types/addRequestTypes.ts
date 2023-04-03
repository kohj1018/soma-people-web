import { UserType } from './userType'

export interface AddUserType {
  name: string
  userType: UserType
  cardinalNum: number | null
  email: string
  oauthId: string
  refreshToken: string
  agreeTerms: boolean
}

export interface AddPostType {
  boardId: number
  userId: number
  title: string
  content: string
  isAnonymous: boolean
}

export interface AddCommentType {
  postId: number
  userId: number
  refId: number
  content: string
  isAnonymous: boolean
}

export interface AddBlockUserLogType {
  userId: number
  blockUserId: number
}