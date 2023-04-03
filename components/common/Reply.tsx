import { NextRouter } from 'next/router'
import { CommentInfoType, ReplyInfoType, UserInfoType } from '../../utils/types/responseTypes'
import React, { useState } from 'react'
import useCommentMutation from '../../hooks/useCommentMutation'
import SubdirectoryArrowRight from '@mui/icons-material/SubdirectoryArrowRight'
import Verified from '@mui/icons-material/Verified'
import UserTypeTag from '../tag/UserTypeTag'
import MoreVert from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import { MuiDialog } from './MuiDialog'

interface Props {
  router: NextRouter
  replyInfo: ReplyInfoType
  userInfo: UserInfoType | null
  setReplyInfoToUpdate: (replyInfoToUpdate: CommentInfoType | null) => void
  showCertified: boolean
}

function Reply({ router, replyInfo, userInfo, setReplyInfoToUpdate, showCertified }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isDeleteReplyDialogOpen, setIsDeleteReplyDialogOpen] = useState<boolean>(false)
  const { handleCommentMutation: deleteReply } = useCommentMutation(  // 대댓글 삭제 함수
    { // TODO: 추후 수정
      commentId: replyInfo.commentId,
      postId: replyInfo.postId,
      user: replyInfo.user,
      content: replyInfo.content,
      isAnonymous: replyInfo.isAnonymous,
      replyList: [], // 필요 없는 값
      isDelete: replyInfo.isDelete,
      createdAt: replyInfo.createdAt,
      updatedAt: replyInfo.updatedAt
    },
    userInfo?.userId,
    true
  )

  // 프로필 확인 페이지로 이동 함수
  const viewOtherUserProfile = () => {
    if (!!replyInfo && !replyInfo.isAnonymous) {
      router.push(`/profile/${replyInfo.user.userId}`)
    }
  }

  return (
    <article className='px-5 py-4 space-y-4 border-b border-gray-100 bg-gray-50'>
      {/* 대댓글 헤더 */}
      <header className='w-full flex items-center justify-between'>
        <button
          onClick={() => viewOtherUserProfile()}
          className='flex items-center space-x-1.5'
        >
          <SubdirectoryArrowRight className='!w-3.5 !h-3.5 text-emerald-500 lg:!w-[1.125rem] lg:!h-[1.125rem]' />
          <p className='text-sm font-medium text-gray-400 flex items-center lg:text-base'>
            {replyInfo.isAnonymous ? '익명' : replyInfo.user.name}
            <>
              {/* 연수생 인증 마크 */}
              {showCertified && replyInfo.user.isCertified &&
                <Verified className='ml-0.5 !w-4 !h-4 text-emerald-500' />
              }
            </>
          </p>
          <UserTypeTag userType={replyInfo.user.userType} cardinalNum={replyInfo.user.cardinalNum} isAnonymous={replyInfo.isAnonymous} />
        </button>
        <button onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert className='!w-4 !h-4 text-gray-400 lg:!w-5 lg:!h-5' />
        </button>

        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          {replyInfo.user.userId !== userInfo?.userId &&
            <MenuItem
              onClick={() => router.push({
                pathname: '/customerService/report',
                query: {
                  reportTargetId: replyInfo.commentId,
                  reportTargetType: '댓글',
                  reportTargetTitle: replyInfo.content
                }
              })}
            >
              신고하기
            </MenuItem>
          }
          {replyInfo.user.userId === userInfo?.userId &&
            [
              <MenuItem key='수정' onClick={() => setReplyInfoToUpdate({ // TODO: 추후 수정
                commentId: replyInfo.commentId,
                postId: replyInfo.postId,  // 필요 없는 값
                user: replyInfo.user,
                content: replyInfo.content,
                isAnonymous: replyInfo.isAnonymous,
                replyList: [], // 필요 없는 값
                isDelete: replyInfo.isDelete,
                createdAt: replyInfo.createdAt,
                updatedAt: replyInfo.updatedAt
              })}>
                수정하기
              </MenuItem>,
              <MenuItem key='삭제' onClick={() => setIsDeleteReplyDialogOpen(true)}>
                삭제하기
              </MenuItem>
            ]
          }
        </Menu>
      </header>

      {/* 대댓글 본문 */}
      <main className='text-base font-normal text-gray-700 whitespace-pre-wrap lg:text-lg'>{replyInfo.content}</main>

      {/* 대댓글 푸터 */}
      <footer className='text-sm font-semibold text-gray-400 lg:text-base'>
        {getElapsedTime(dayjs(replyInfo.createdAt))}
        <span className='text-gray-300'>{dayjs(replyInfo.createdAt).isBefore(replyInfo.updatedAt) && ' · 수정됨'}</span>
      </footer>

      {/* 대댓글 삭제 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isDeleteReplyDialogOpen}
        setIsDialogOpen={setIsDeleteReplyDialogOpen}
        dialogTitle='답글 삭제'
        dialogContent='정말로 삭제하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={deleteReply}
      />
    </article>
  )
}

export default Reply