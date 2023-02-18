import { UserType } from './userType'

export interface AddUserType {
  name: string
  userType: UserType
  cardinalNum: number | null
  isCertified: boolean
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
  content: string
  isAnonymous: boolean
}

export interface AddBlockUserLogType {
  userId: number
  blockUserId: number
}