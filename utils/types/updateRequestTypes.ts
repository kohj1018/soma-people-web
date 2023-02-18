export interface UpdateUserType {
  name: string
  isDelete: boolean
}

export interface UpdatePostType {
  boardId: number
  title: string
  content: string
  isAnonymous: boolean
  isDelete: boolean
}

export interface UpdateCommentType {
  content: string
  isAnonymous: boolean
  isDelete: boolean
}