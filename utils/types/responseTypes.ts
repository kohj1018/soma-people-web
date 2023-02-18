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

export interface BoardInfoType {
  boardId: number
  name: string
}

export interface PostInfoType {
  postId: number
  board: BoardInfoType
  user: UserInfoType
  title: string
  content: string
  isAnonymous: boolean
  hits: number
  createdAt: string
  updatedAt: string | null
}

export interface CommentInfoType {
  commentId: number
  postId: number
  user: UserInfoType
  content: string
  isAnonymous: boolean
  isDelete: boolean
  createdAt: string
  updatedAt: string | null
}

