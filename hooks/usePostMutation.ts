import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost } from '../utils/apis/postsApi'
import { postKeys } from '../utils/constants/reactQueryKeyConstants'
import { UpdatePostType } from '../utils/types/updateRequestTypes'
import { useRouter } from 'next/router'
import { PostInfoType } from '../utils/types/responseTypes'
import { useSnackbarOpenStore } from '../stores/stores'

interface MutationProps {
  postId: number
  updatePostRequest: UpdatePostType
}

/** 게시글 수정 Mutation (삭제 : isDelete만 true로 / 수정 : 수정할 값들까지 모두 입력) */
function usePostMutation(
  postInfoBeforeUpdate: PostInfoType | undefined,
  userId: number | undefined,
  isDelete: boolean,
  updatedTitle?: string,
  updatedContent?: string,
  updatedIsAnonymous?: boolean
): { handlePostMutation: () => void } {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setMessage } = useSnackbarOpenStore()

  const postMutation = useMutation(
  ({ postId, updatePostRequest }: MutationProps) => updatePost(postId, updatePostRequest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(postKeys.list(postInfoBeforeUpdate!.board.boardId, userId!))
        if (isDelete) {
          setMessage('게시글이 삭제되었습니다.')
          router.replace('/board')
        } else {
          setMessage('게시글이 수정되었습니다.')
          router.back()
        }
      },
      onError: () => {
        setMessage('실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
  )

  /** 게시글 수정 함수 */
  const handlePostMutation = () => {
    if (!!userId && !!postInfoBeforeUpdate) {
      if (isDelete) {  // 게시글 삭제
        postMutation.mutate({
          postId: postInfoBeforeUpdate.postId,
          updatePostRequest: {
            boardId: postInfoBeforeUpdate.board.boardId,
            title: postInfoBeforeUpdate.title,
            content: postInfoBeforeUpdate.content,
            isAnonymous: postInfoBeforeUpdate.isAnonymous,
            isDelete: true
          }
        })
      } else {  // 게시글 수정
        if (!updatedTitle) {
          setMessage('글 제목을 입력해주세요.')
        } else if (!updatedContent) {
          setMessage('본문 내용을 입력해주세요.')
        } else {
          if (updatedIsAnonymous !== undefined) {
            postMutation.mutate({
              postId: postInfoBeforeUpdate.postId,
              updatePostRequest: {
                boardId: postInfoBeforeUpdate.board.boardId,
                title: updatedTitle,
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

  return { handlePostMutation }
}

export default usePostMutation