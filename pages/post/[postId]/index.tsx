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
import UserTypeTag from '../../../components/tag/UserTypeTag'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import { getElapsedTime } from '../../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import LoadingCircular from '../../../components/layout/LoadingCircular'
import dynamic from 'next/dynamic'
import CommentWritingArea from '../../../components/common/CommentWritingArea'
import usePostMutation from '../../../hooks/usePostMutation'
import { MuiDialog } from '../../../components/common/MuiDialog'
import { useSnackbarOpenStore } from '../../../stores/stores'
import { useUserHiddenPostIdListStore } from '../../../stores/localStorageStore/stores'
import SEO from '../../../components/SEO'
import Verified from '@mui/icons-material/Verified'
import ContentThatTurnsLinksIntoURLs from '../../../utils/functions/ContentThatTurnsLinksIntoURLs'
const CommentListSection = dynamic(() => import('../../../components/common/CommentListSection'), {loading: () => <LoadingCircular />, ssr: false})

const PostDetail: NextPage = () => {
  const router = useRouter()
  const userInfo = useUserInfo()
  const postId: number = parseInt(router.query.postId as string)
  const { setMessage } = useSnackbarOpenStore()
  const { data: postInfo } = useQuery<PostInfoType>(
    postKeys.detail(postId),
    () => getPostInfoByPostId(postId),
    {
      enabled: !!postId,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false
    }
  )
  const { hiddenPostIdList, setHiddenPostIdList } = useUserHiddenPostIdListStore()
  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState<boolean>(false)
  const { handlePostMutation: deletePost } = usePostMutation(postInfo, userInfo?.userId, true)  // 게시글 삭제 함수

  const [commentInfoToUpdate, setCommentInfoToUpdate] = useState<CommentInfoType | null>(null)  // 수정할 댓글 State

  const [refId, setRefId] = useState<number>(0) // 대댓글 or 댓글 작성 변수
  const commentWritingInputRef = useRef<HTMLTextAreaElement>(null)

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
    if (!!userInfo?.userId && !!postInfo?.user.userId) {
      if (userInfo.userId !== postInfo.user.userId) {
        increaseView(postInfo.postId, userInfo.userId)
      }
    }
  }, [userInfo, postInfo])

  // 프로필 확인 페이지로 이동 함수
  const viewOtherUserProfile = () => {
    if (!!postInfo && !postInfo.isAnonymous) {
      router.push(`/profile/${postInfo.user.userId}`)
    }
  }

  // 게시글 숨기기 함수
  const hidePost = () => {
    setHiddenPostIdList(hiddenPostIdList.concat(postId))
    setMessage('게시글 숨기기를 완료했습니다.')
    router.back()
  }

  if (!postId) return <LoadingCircular />

  return (
    <MainContainer>
      {!!postInfo &&
        <SEO title={`${postInfo.title} : 게시글`} />
      }

      <MobileBackHeader title={postInfo?.board.name ?? ''}>
        {postInfo?.user.userId !== userInfo?.userId &&
          [
            <MenuItem
              key='신고'
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
            </MenuItem>,
            <MenuItem
              key='숨기기'
              onClick={() => hidePost()}
            >
              게시글 숨기기
            </MenuItem>
          ]
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

      <main className='paddingHeader min-h-screen pb-16 space-y-3 bg-gray-50'>
        <Suspense fallback={<LoadingCircular />}>
          {/* Post 상세 */}
          {!!postInfo &&
            <article className='pt-8 px-5 pb-4 bg-white lg:pt-[3.75rem] lg:px-0 lg:pb-8'>
              <div className='lg:mainWidthLimit'>
                <article className='space-y-3 pb-5 border-b border-gray-100 lg:pb-6'>
                  <button
                    onClick={() => viewOtherUserProfile()}
                    className='flex items-center space-x-1.5'
                  >
                    <p className='text-sm font-medium text-gray-400 flex items-center lg:text-base'>
                      {postInfo.isAnonymous ? '익명' : postInfo.user.name}
                      <>
                        {/* 연수생 인증 마크 */}
                        {postInfo.board.boardId === 4 && postInfo.user.isCertified &&
                          <Verified className='ml-0.5 !w-4 !h-4 text-emerald-500' />
                        }
                      </>
                    </p>
                    <UserTypeTag userType={postInfo.user.userType} cardinalNum={postInfo.user.cardinalNum} isAnonymous={postInfo.isAnonymous} />
                  </button>
                  <h1 className='text-lg font-medium text-gray-900 lg:text-xl'>{postInfo.title}</h1>
                </article>
                {/* TODO: dangerouslySetInnerHTML가 보안상의 위험이 있어 아래를 안쓰는데 나중에 더 고민해서 바꿔봐도 좋을 듯 */}
                {/*<p className='mt-5 text-base font-normal text-gray-700 whitespace-pre-wrap lg:mt-6 lg:text-lg' dangerouslySetInnerHTML={{ __html: replaceLinkInContentToUrl(postInfo.content) }} />*/}
                <p className='mt-5 text-base font-normal text-gray-700 whitespace-pre-wrap break-all lg:mt-6 lg:text-lg' >
                  <ContentThatTurnsLinksIntoURLs content={postInfo.content} />
                </p>
                <footer className='mt-8 w-full flex items-center justify-between'>
                  <div className='flex items-center space-x-1.5'>
                    <RemoveRedEye className='!w-4 !h-4 text-gray-200 lg:!w-5 lg:!h-5' />
                    <p className='text-sm font-semibold text-gray-500 lg:text-base'>{postInfo.hits}</p>
                  </div>
                  <p className='text-sm font-semibold text-gray-400 lg:text-base'>
                    {getElapsedTime(dayjs(postInfo.createdAt))}
                    <span className='text-gray-300'>{!!postInfo.updatedAt && ' · 수정됨'}</span>
                  </p>
                </footer>
              </div>
            </article>
          }
        </Suspense>

        {/* 댓글 영역 */}
        <article className='py-6 bg-white lg:px-0 lg:py-8'>
          <div className='space-y-6 lg:space-y-9 lg:mainWidthLimit'>
            <header className='px-5 flex items-center space-x-1 lg:px-0'>
              <h3 className='text-xl font-medium text-gray-900'>댓글</h3>
              <div className='px-2 py-0.5 flex items-center justify-center rounded-full bg-emerald-400'>
                <p className='text-sm font-semibold text-emerald-50'>{postInfo?.commentsNum}</p>
              </div>
              {postInfo?.commentsNum === 0 &&
                <p className='pl-4 text-sm font-semibold text-gray-500'>첫 번째 댓글을 달아주세요 :)</p>
              }
            </header>

            {/* 댓글 작성 영역 (PC) */}
            {!!userInfo && window.innerWidth >= 1024 &&
              <CommentWritingArea
                postId={postId}
                userInfo={userInfo}
                commentInfoToUpdate={commentInfoToUpdate}
                setCommentInfoToUpdate={setCommentInfoToUpdate}
                refId={refId}
                commentWritingInputRef={commentWritingInputRef}
              />
            }

            {/* 댓글들 */}
            {!!userInfo &&
              <CommentListSection
                postId={postId}
                userInfo={userInfo}
                setCommentInfoToUpdate={setCommentInfoToUpdate}
                showCertified={postInfo?.board.boardId === 4}
                setRefId={setRefId}
                commentWritingInputRef={commentWritingInputRef}
              />
            }
          </div>
        </article>

        {/* 댓글 작성 영역 (모바일) */}
        {!!userInfo && window.innerWidth < 1024 &&
          <CommentWritingArea
            postId={postId}
            userInfo={userInfo}
            commentInfoToUpdate={commentInfoToUpdate}
            setCommentInfoToUpdate={setCommentInfoToUpdate}
            refId={refId}
            commentWritingInputRef={commentWritingInputRef}
          />
        }
      </main>

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