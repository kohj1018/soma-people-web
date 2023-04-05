import CheckBox from '@mui/icons-material/CheckBox'
import Send from '@mui/icons-material/Send'
import React, { useEffect, useState } from 'react'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment } from '../../utils/apis/commentsApi'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { CommentInfoType, UserInfoType } from '../../utils/types/responseTypes'
import useCommentMutation from '../../hooks/useCommentMutation'
import { AddCommentType } from '../../utils/types/addRequestTypes'

interface Props {
  postId: number
  userInfo: UserInfoType
  commentInfoToUpdate: CommentInfoType | null
  setCommentInfoToUpdate: (commentInfoToEdit: CommentInfoType | null) => void
  refId: number
  commentWritingInputRef: React.RefObject<HTMLTextAreaElement>
}

function CommentWritingArea({ postId, userInfo, commentInfoToUpdate, setCommentInfoToUpdate, refId, commentWritingInputRef }: Props) {
  const queryClient = useQueryClient()
  const [commentContent, setCommentContent] = useState<string>('')
  const [isCommentAnonymous, setIsCommentAnonymous] = useState<boolean>(true)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const { setMessage } = useSnackbarOpenStore()

  const { mutate: commentSaveMutate } = useMutation(
    async (addCommentRequest: AddCommentType) => {
      try {
        addComment(addCommentRequest)
          .then(() => {
            queryClient.invalidateQueries(postKeys.detail(postId))
              .then(() => {
                if (!!commentWritingInputRef.current) {  // 댓글 입력창 초기화
                  setCommentContent('')
                  commentWritingInputRef.current.style.height = 'auto'
                }
                setMessage('댓글이 등록되었습니다.')
              })
          })
      } catch (error) {
        setMessage('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
    },
    {
      onSuccess: () => {
        setIsDisabled(true)
        setTimeout( // 1초 뒤에 disable 해제
          () => setIsDisabled(false),
          1000
        )
      }
    }
  )

  const { handleCommentMutation } = useCommentMutation(commentInfoToUpdate, userInfo.userId, false, commentContent, isCommentAnonymous)

  // 댓글 수정 요청 시 수정 이전 값 채워 넣기
  useEffect(() => {
    if (!!commentInfoToUpdate && !!commentWritingInputRef.current) {
      setCommentContent(commentInfoToUpdate.content)
      setIsCommentAnonymous(commentInfoToUpdate.isAnonymous)
      commentWritingInputRef.current.style.height = 'auto'  // height 초기화
      commentWritingInputRef.current.style.height = commentWritingInputRef.current.scrollHeight + 'px'
      commentWritingInputRef.current.focus()
    }
  }, [commentInfoToUpdate])

  // 댓글 입력창 자동 크기 조절
  useEffect(() => {
    if (!!commentWritingInputRef.current) {
      commentWritingInputRef.current.style.height = 'auto'  // height 초기화
      commentWritingInputRef.current.style.height = commentWritingInputRef.current.scrollHeight + 'px'
    }
  }, [commentContent])


  // 댓글 작성 함수
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!!userInfo) {
      if (!commentContent) {
        setMessage('댓글을 먼저 입력해주세요.')
      } else if (!!commentInfoToUpdate) { // 댓글 수정
        handleCommentMutation()
        setCommentInfoToUpdate(null)  // 수정한 댓글 정보 초기화
        setCommentContent('') // 댓글 입력창 초기화
      } else {  // 댓글 등록
        commentSaveMutate({
          postId: postId,
          userId: userInfo.userId,
          refId: refId,
          content: commentContent,
          isAnonymous: isCommentAnonymous
        })
      }
    }
  }

  return (
    <article className='fixed bottom-0 inset-x-0 px-5 py-3 flex items-center justify-between space-x-4 bg-white z-50 lg:static lg:px-6 lg:py-5 lg:rounded-lg lg:bg-gray-50'>
      <button
        onClick={() => setIsCommentAnonymous(!isCommentAnonymous)}
        className='flex items-center space-x-0.5'
        disabled={isDisabled}
      >
        <p className='text-sm font-semibold text-gray-400 whitespace-nowrap lg:text-base'>익명</p>
        <CheckBox className={'!w-4 !h-4 lg:!w-5 lg:!h-5' + (isCommentAnonymous ? ' text-gray-700' : ' text-gray-300')} />
      </button>
      <textarea
        ref={commentWritingInputRef}
        className='grow px-4 py-2.5 rounded text-sm font-medium text-gray-700 bg-gray-100 resize-none lg:p-0 lg:text-base lg:bg-gray-50 placeholder:text-gray-400 focus:outline-none hide-scrollbar'
        placeholder='댓글을 입력하세요'
        rows={1}
        maxLength={1000}
        value={commentContent}
        onChange={(e) => { if (e.target.value.length < e.target.maxLength + 1) setCommentContent(e.target.value)} }
        disabled={isDisabled}
        required
      />
      <button
        onClick={(e) => handleSubmit(e)}
        disabled={isDisabled}
      >
        <Send className='!w-6 !h-6 text-blue-500 lg:!w-7 lg:!h-7' />
      </button>
    </article>
  )
}

export default CommentWritingArea