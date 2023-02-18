import { CommentInfoType } from '../types/responseTypes'
import { ec2 } from './apiConfig'
import { AddCommentType } from '../types/addRequestTypes'
import { UpdateCommentType } from '../types/updateRequestTypes'

/** 게시글에 달린 댓글 모두 불러오기 */
export const getAllCommentInfoByPostId = async (postId: number, userId: number): Promise<CommentInfoType[]> => {
  const res = await ec2.get<CommentInfoType[]>(`/comments?postId=${postId}&userId=${userId}`)
  return res.data
}

/** 유저가 작성한 댓글 모두 불러오기 */
export const getCommentInfoListByUser = async (userId: number): Promise<CommentInfoType[]> => {
  const res = await ec2.get<CommentInfoType[]>(`/comments/writtenByUser/${userId}`)
  return res.data
}

/** 새 댓글 추가하기 */
export const addComment = (addCommentRequest: AddCommentType) => ec2.post('/comments', addCommentRequest)

/** 댓글 수정하기 */
export const updateComment = (commentId: number, updateCommentRequest: UpdateCommentType) => ec2.put(`/comments/${commentId}`, updateCommentRequest)