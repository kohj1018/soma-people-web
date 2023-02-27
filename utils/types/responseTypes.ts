import { UserType } from './userType'

export interface UserInfoType {
  userId: number
  name: string
  userType: UserType
  cardinalNum: number | null
  isCertified: boolean
  numOfPostsWritten: number
  numOfCommentsWritten: number
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
  commentsNum: number
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

export interface MainPagePostListInfoType {
  qnaPostList: PostInfoType[]
  freePostList: PostInfoType[]
  applicantPostList: PostInfoType[]
}