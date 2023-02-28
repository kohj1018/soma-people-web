import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MainContainer from '../../../components/layout/MainContainer'
import MobileBackHeader from '../../../components/layout/mobileHeader/MobileBackHeader'
import MenuItem from '@mui/material/MenuItem'
import useUserInfo from '../../../hooks/useUserInfo'
import { useQuery } from '@tanstack/react-query'
import { CommentInfoType, PostInfoType } from '../../../utils/types/responseTypes'
import { postKeys } from '../../../utils/constants/reactQueryKeyConstants'
import { getPostInfoByPostId, increaseView } from '../../../utils/apis/postsApi'
import MainArea from '../../../components/layout/MainArea'
import UserTypeTag from '../../../components/tag/UserTypeTag'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import { getElapsedTime } from '../../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import React, { Suspense, useEffect, useState } from 'react'
import LoadingCircular from '../../../components/layout/LoadingCircular'
import dynamic from 'next/dynamic'
import CommentWritingArea from '../../../components/common/CommentWritingArea'
import usePostMutation from '../../../hooks/usePostMutation'
import { MuiDialog } from '../../../components/common/MuiDialog'
import { useSnackbarOpenStore } from '../../../stores/stores'
const CommentListSection = dynamic(() => import('../../../components/common/CommentListSection'), {loading: () => <LoadingCircular />, ssr: false})

const PostDetail: NextPage = () => {
  const router = useRouter()
  const userInfo = useUserInfo()
  const postId: number = parseInt(router.query.postId as string)
  const { setMessage } = useSnackbarOpenStore()
  const { data: postInfo, isLoading } = useQuery<PostInfoType>(
    postKeys.detail(postId),
    () => getPostInfoByPostId(postId),
    {
      enabled: !!postId,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false
    }
  )
  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState<boolean>(false)
  const { handlePostMutation: deletePost } = usePostMutation(postInfo, userInfo?.userId, true)  // 게시글 삭제 함수

  const [commentInfoToUpdate, setCommentInfoToUpdate] = useState<CommentInfoType | null>(null)  // 수정할 댓글 State

  // 소마인 인증 안했는데 준비생 게시판 외 게시판의 글을 보는 경우 Redirect
  useEffect(() => {
    if (!!postInfo && !!userInfo) {
      if (postInfo.board.boardId !== 4 && !userInfo.isCertified) {
        setMessage('해당 게시판은 프로필 탭에서 소마인 인증을 받은 후 이용할 수 있습니다.')
        router.back()
      }
    }
  }, [postInfo, userInfo])

  // 조회수 증가
  useEffect(() => {
    if (!!userInfo?.userId && isLoading && !!postInfo) {
      // @ts-ignore
      if (userInfo.userId !== postInfo.user.userId)
      increaseView(postId , userInfo.userId)
    }
  }, [userInfo, isLoading])

  return (
    <MainContainer>
      <MobileBackHeader title={postInfo?.board.name ?? ''}>
        {postInfo?.user.userId !== userInfo?.userId &&
          <MenuItem
            onClick={() => router.push({
              pathname: '/customerService/report',
              query: {
                reportTargetId: postId,
                reportTargetType: '게시글',
                reportTargetTitle: postInfo?.title
              }
            })}
          >
            신고하기
          </MenuItem>
        }
        {postInfo?.user.userId === userInfo?.userId &&
          [
            <MenuItem key='수정' onClick={() => router.push(`/post/${postId}/updatePost`)}>
              수정하기
            </MenuItem>,
            <MenuItem key='삭제' onClick={() => setIsDeletePostDialogOpen(true)}>
              삭제하기
            </MenuItem>
          ]
        }
      </MobileBackHeader>

      <MainArea className='min-h-screen pb-16 bg-gray-50'>
        <Suspense fallback={<LoadingCircular />}>
          {/* Post 상세 */}
          {!!postInfo &&
            <article className='pt-8 px-5 pb-4 bg-white'>
              <article className='space-y-3 pb-5 border-b border-gray-100'>
                <div className='flex items-center space-x-1.5'>
                  <p className='text-sm font-medium text-gray-400'>{postInfo.isAnonymous ? '익명' : postInfo.user.name}</p>
                  <UserTypeTag userType={postInfo.user.userType} cardinalNum={postInfo.user.cardinalNum} isAnonymous={postInfo.isAnonymous} />
                </div>
                <h1 className='text-lg font-medium text-gray-900'>{postInfo.title}</h1>
              </article>
              <p className='mt-5 text-base font-normal text-gray-700'>{postInfo.content}</p>
              <footer className='mt-8 w-full flex items-center justify-between'>
                <div className='flex items-center space-x-1.5'>
                  <RemoveRedEye className='!w-4 !h-4 text-gray-200' />
                  <p className='text-sm font-semibold text-gray-500'>{postInfo.hits}</p>
                </div>
                <p className='text-sm font-semibold text-gray-400'>{getElapsedTime(dayjs(postInfo.createdAt))}</p>
              </footer>
            </article>
          }
        </Suspense>

        {/* 댓글 영역 */}
        <article className='relative px-5 py-8'>
          <div className='flex items-center space-x-1'>
            <h2 className='text-xl font-medium text-gray-900'>댓글</h2>
            <div className='px-2 py-0.5 flex items-center justify-center rounded-full bg-gray-200'>
              <p className='text-sm font-semibold text-blue-500'>{postInfo?.commentsNum}</p>
            </div>
            {postInfo?.commentsNum === 0 &&
              <p className='pl-4 text-sm font-semibold text-gray-500'>첫 번째 댓글을 달아주세요 :)</p>
            }
          </div>
          <CommentListSection postId={postId} userInfo={userInfo} setCommentInfoToUpdate={setCommentInfoToUpdate} />
        </article>

        {/* 댓글 작성 영역 */}
        <CommentWritingArea postId={postId} userInfo={userInfo} commentInfoToUpdate={commentInfoToUpdate} setCommentInfoToUpdate={setCommentInfoToUpdate} />
      </MainArea>

      {/* 게시글 삭제 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isDeletePostDialogOpen}
        setIsDialogOpen={setIsDeletePostDialogOpen}
        dialogTitle='게시글 삭제'
        dialogContent='정말로 삭제하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={deletePost}
      />
    </MainContainer>
  )
}

export default PostDetail