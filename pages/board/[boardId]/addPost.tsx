import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MainContainer from '../../../components/layout/MainContainer'
import MobileCancelHeader from '../../../components/layout/mobileHeader/MobileCancelHeader'
import MainArea from '../../../components/layout/MainArea'
import React, { useEffect, useState } from 'react'
import CheckBox from '@mui/icons-material/CheckBox'
import useUserInfo from '../../../hooks/useUserInfo'
import { useSnackbarOpenStore } from '../../../stores/stores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPost } from '../../../utils/apis/postsApi'
import { postKeys } from '../../../utils/constants/reactQueryKeyConstants'
import { AddPostType } from '../../../utils/types/addRequestTypes'
import SEO from '../../../components/SEO'

const AddPost: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const userInfo = useUserInfo()
  const boardId: number = parseInt(router.query.boardId as string)
  const boardName: string = router.query.boardName as string
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true)
  const { setMessage } = useSnackbarOpenStore()
  const { mutate: postMutate, isSuccess } = useMutation(
    async (addPostRequest: AddPostType) => {
      try {
        addPost(addPostRequest)
          .then(() => {
            queryClient.invalidateQueries(postKeys.list(boardId, userInfo!.userId))
              .then(() => {
                setMessage('게시글이 등록되었습니다.')
                router.back()
              })
          })
      }
      catch (error) {
        setMessage('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
    },
    // {  //TODO: 이 부분 추가하면 isSuccess를 활용한 disabled가 안먹힘 (포스팅할 때 써먹기)
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(postKeys.list(boardId, userInfo!.userId))
    //       .then(() => {
    //         setMessage('게시글이 등록되었습니다.')
    //         router.back()
    //       })
    //   }
    // }
  )

  const [activateButton, setActivateButton] = useState<boolean>(false)
  useEffect(() => { if (!!title && !!content) setActivateButton(true); else setActivateButton(false) }, [title, content]) // 등록 버튼 활성화
  const handleSubmit = () => {
    if (!!userInfo) {
      if (!title) {
        setMessage('글 제목을 입력해주세요.')
      } else if (!content) {
        setMessage('본문 내용을 입력해주세요.')
      } else {
        postMutate({
          boardId: boardId,
          userId: userInfo.userId,
          title: title,
          content: content,
          isAnonymous: isAnonymous
        })
      }
    }
  }

  return (
    <MainContainer>
      <SEO title='글 작성하기' />

      <MobileCancelHeader title='글 작성하기' buttonFunc={handleSubmit} activateButton={activateButton} isSuccess={isSuccess} />

      <MainArea className='px-5'>
        <input
          type='text'
          className='mt-8 w-full pb-4 text-lg font-medium text-gray-900 border-b border-gray-100 placeholder:text-gray-400 focus:outline-none'
          placeholder='글 제목을 입력하세요.'
          maxLength={100}
          value={title}
          onChange={(e) => { if (e.target.value.length < e.target.maxLength + 1) setTitle(e.target.value) }}
          required
        />
        <textarea
          className='mt-6 w-full h-[65vh] text-base font-normal text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none hide-scrollbar'
          placeholder='본문 내용을 입력하세요.'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </MainArea>

      <article className='fixed bottom-0 inset-x-0 px-5 py-3.5 flex items-center justify-between bg-gray-50'>
        <p className='text-sm font-semibold text-gray-400'><span>{boardName}</span>에 등록</p>
        <button onClick={() => setIsAnonymous(!isAnonymous)} className='flex items-center space-x-0.5'>
          <p className='text-sm font-semibold text-gray-400'>익명</p>
          <CheckBox className={'!w-4 !h-4' + (isAnonymous ? ' text-gray-700' : ' text-gray-300')} />
        </button>
      </article>
    </MainContainer>
  )
}

export default AddPost