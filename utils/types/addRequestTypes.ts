import { UserType } from './userType'
import { NotificationType } from './notificationType'

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

export interface AddNotificationLogType {
  sendingUserId: number
  targetUserId: number
  postId: number
  boardName: string
  notificationType: NotificationType
  content: string
}