import CheckBox from '@mui/icons-material/CheckBox'
import Send from '@mui/icons-material/Send'
import React, { useEffect, useRef, useState } from 'react'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment } from '../../utils/apis/commentsApi'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { CommentInfoType, UserInfoType } from '../../utils/types/responseTypes'
import useCommentMutation from '../../hooks/useCommentMutation'

interface Props {
  postId: number
  userInfo: UserInfoType | null
  commentInfoToUpdate: CommentInfoType | null
  setCommentInfoToUpdate: (commentInfoToEdit: CommentInfoType | null) => void
}

function CommentWritingArea({ postId, userInfo, commentInfoToUpdate, setCommentInfoToUpdate }: Props) {
  const queryClient = useQueryClient()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [commentContent, setCommentContent] = useState<string>('')
  const [isCommentAnonymous, setIsCommentAnonymous] = useState<boolean>(true)
  const { setMessage } = useSnackbarOpenStore()

  const commentSaveMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(postKeys.detail(postId))
        .then(() => {
          if (!!textareaRef.current) {  // 댓글 입력창 초기화
            setCommentContent('')
            textareaRef.current.style.height = 'auto'
          }
          setMessage('댓글이 등록되었습니다.')
        })
    }
  })

  const { handleCommentMutation } = useCommentMutation(commentInfoToUpdate, userInfo?.userId, false, commentContent, isCommentAnonymous)

  // 댓글 수정 요청 시 수정 이전 값 채워 넣기
  useEffect(() => {
    if (!!commentInfoToUpdate && !!textareaRef.current) {
      setCommentContent(commentInfoToUpdate.content)
      setIsCommentAnonymous(commentInfoToUpdate.isAnonymous)
      textareaRef.current.style.height = 'auto'  // height 초기화
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [commentInfoToUpdate])

  // 댓글 입력창 자동 크기 조절
  useEffect(() => {
    if (!!textareaRef.current) {
      textareaRef.current.style.height = 'auto'  // height 초기화
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
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
        commentSaveMutation.mutate({
          postId: postId,
          userId: userInfo.userId,
          content: commentContent,
          isAnonymous: isCommentAnonymous
        })
      }
    }
  }

  return (
    <article className='fixed bottom-0 inset-x-0 px-5 py-3 flex items-center justify-between space-x-4 bg-white z-50'>
      <button
        onClick={() => setIsCommentAnonymous(!isCommentAnonymous)}
        className='w-[2.6875rem] flex items-center space-x-0.5'
      >
        <p className='text-sm font-semibold text-gray-400'>익명</p>
        <CheckBox className={'!w-4 !h-4' + (isCommentAnonymous ? ' text-gray-700' : ' text-gray-300')} />
      </button>
      <textarea
        ref={textareaRef}
        className='grow px-4 py-2.5 rounded text-sm font-medium text-gray-700 bg-gray-100 resize-none placeholder:text-gray-400 focus:outline-none hide-scrollbar'
        placeholder='댓글을 입력하세요'
        rows={1}
        maxLength={1000}
        value={commentContent}
        onChange={(e) => { if (e.target.value.length < e.target.maxLength + 1) setCommentContent(e.target.value)} }
        required
      />
      <button onClick={(e) => handleSubmit(e)}>
        <Send className='!w-6 !h-6 text-blue-500' />
      </button>
    </article>
  )
}

export default CommentWritingArea