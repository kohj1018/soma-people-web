import UserTypeTag from '../tag/UserTypeTag'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import MoreVert from '@mui/icons-material/MoreVert'
import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { NextRouter } from 'next/router'
import { CommentInfoType, UserInfoType } from '../../utils/types/responseTypes'
import useCommentMutation from '../../hooks/useCommentMutation'
import { MuiDialog } from './MuiDialog'
import Verified from '@mui/icons-material/Verified'
import SubdirectoryArrowRight from '@mui/icons-material/SubdirectoryArrowRight'

interface Props {
  router: NextRouter
  commentInfo: CommentInfoType
  userInfo: UserInfoType | null
  setCommentInfoToUpdate: (commentInfoToUpdate: CommentInfoType | null) => void
  showCertified: boolean
  setRefId: (refId: number) => void
  commentWritingInputRef: React.RefObject<HTMLTextAreaElement>
}

function Comment({ router, commentInfo, userInfo, setCommentInfoToUpdate, showCertified, setRefId, commentWritingInputRef }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isDeleteCommentDialogOpen, setIsDeleteCommentDialogOpen] = useState<boolean>(false)
  const { handleCommentMutation: deleteComment } = useCommentMutation(commentInfo, userInfo?.userId, true)  // 댓글 삭제 함수

  // 프로필 확인 페이지로 이동 함수
  const viewOtherUserProfile = () => {
    if (!!commentInfo && !commentInfo.isAnonymous) {
      router.push(`/profile/${commentInfo.user.userId}`)
    }
  }

  const writeReply = () => {
    setRefId(commentInfo.commentId)
    commentWritingInputRef.current?.focus()
  }

  return (
    <article className='px-5 py-6 space-y-4 border-b border-gray-100 first:pt-0 lg:px-0'>
      {/* 댓글 헤더 */}
      <header className='w-full flex items-center justify-between'>
        <button
          onClick={() => viewOtherUserProfile()}
          className='flex items-center space-x-1.5'
        >
          <p className='text-sm font-medium text-gray-400 flex items-center lg:text-base'>
            {commentInfo.isAnonymous ? '익명' : commentInfo.user.name}
            <>
              {/* 연수생 인증 마크 */}
              {showCertified && commentInfo.user.isCertified &&
                <Verified className='ml-0.5 !w-4 !h-4 text-emerald-500' />
              }
            </>
          </p>
          <UserTypeTag userType={commentInfo.user.userType} cardinalNum={commentInfo.user.cardinalNum} isAnonymous={commentInfo.isAnonymous} />
        </button>
        <button onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert className='!w-4 !h-4 text-gray-400 lg:!w-5 lg:!h-5' />
        </button>

        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          {commentInfo.user.userId !== userInfo?.userId &&
            <MenuItem
              onClick={() => router.push({
                pathname: '/customerService/report',
                query: {
                  reportTargetId: commentInfo.commentId,
                  reportTargetType: '댓글',
                  reportTargetTitle: commentInfo.content
                }
              })}
            >
              신고하기
            </MenuItem>
          }
          {commentInfo.user.userId === userInfo?.userId &&
            [
              <MenuItem key='수정' onClick={() => setCommentInfoToUpdate(commentInfo)}>
                수정하기
              </MenuItem>,
              <MenuItem key='삭제' onClick={() => setIsDeleteCommentDialogOpen(true)}>
                삭제하기
              </MenuItem>
            ]
          }
        </Menu>
      </header>

      {/* 댓글 본문 */}
      <main className='text-base font-normal text-gray-700 whitespace-pre-wrap lg:text-lg'>{commentInfo.content}</main>

      {/* 댓글 푸터 */}
      <footer className='flex items-center justify-between text-sm lg:text-base'>
        <p className='font-semibold text-gray-400'>
          {getElapsedTime(dayjs(commentInfo.createdAt))}
          <span className='text-gray-300'>{dayjs(commentInfo.createdAt).isBefore(commentInfo.updatedAt) && ' · 수정됨'}</span>
        </p>
        <button
          onClick={() => writeReply()}
          className='flex items-center space-x-0.5 text-emerald-500'
        >
          <SubdirectoryArrowRight className='!w-3.5 !h-3.5' />
          <p className='font-bold'>답글쓰기</p>
        </button>
      </footer>

      {/* 댓글 삭제 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isDeleteCommentDialogOpen}
        setIsDialogOpen={setIsDeleteCommentDialogOpen}
        dialogTitle='댓글 삭제'
        dialogContent='정말로 삭제하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={deleteComment}
      />
    </article>
  )
}

export default Comment