import { UpdateCommentType } from '../utils/types/updateRequestTypes'
import { CommentInfoType } from '../utils/types/responseTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbarOpenStore } from '../stores/stores'
import { updateComment } from '../utils/apis/commentsApi'
import { postKeys } from '../utils/constants/reactQueryKeyConstants'

interface MutationProps {
  commentId: number
  updateCommentRequest: UpdateCommentType
}

/** 댓글 수정 Mutation (삭제 : isDelete만 true로 / 수정 : 수정할 값들까지 모두 입력) */
function useCommentMutation(
  commentInfoBeforeUpdate: CommentInfoType | undefined | null,
  userId: number | undefined,
  isDelete: boolean,
  updatedContent?: string,
  updatedIsAnonymous?: boolean,
): { handleCommentMutation: () => void } {
  const queryClient = useQueryClient()
  const { setMessage } = useSnackbarOpenStore()

  const commentMutation = useMutation(
    ({ commentId, updateCommentRequest }: MutationProps) => updateComment(commentId, updateCommentRequest),
    {
      onSuccess: () => {
        if (!!commentInfoBeforeUpdate) {
          queryClient.invalidateQueries(postKeys.detail(commentInfoBeforeUpdate.postId))  //TODO: 댓글만 업데이트되고 글은 업데이트 안됨
          if (isDelete) {
            setMessage('댓글이 삭제되었습니다.')
          } else {
            setMessage('댓글이 수정되었습니다.')
          }
        }
      },
      onError: () => {
        setMessage('실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
  )

  /** 댓글 수정 함수 */
  const handleCommentMutation = () => {
    if (!!userId && !!commentInfoBeforeUpdate) {
      if (isDelete) { // 댓글 삭제
        commentMutation.mutate({
          commentId: commentInfoBeforeUpdate.commentId,
          updateCommentRequest: {
            content: commentInfoBeforeUpdate.content,
            isAnonymous: commentInfoBeforeUpdate.isAnonymous,
            isDelete: true
          }
        })
      } else {  // 댓글 수정
        if (!updatedContent) {
          setMessage('글 제목을 입력해주세요.')
        } else {
          if (updatedIsAnonymous !== undefined) {
            commentMutation.mutate({
              commentId: commentInfoBeforeUpdate.commentId,
              updateCommentRequest: {
                content: updatedContent,
                isAnonymous: updatedIsAnonymous,
                isDelete: false
              }
            })
          }
        }
      }
    }
  }

  return { handleCommentMutation }
}

export default useCommentMutation