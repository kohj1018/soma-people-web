import Comment from './Comment'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { CommentInfoType, UserInfoType } from '../../utils/types/responseTypes'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { getAllCommentInfoByPostId } from '../../utils/apis/commentsApi'
import { useRouter } from 'next/router'
import Reply from './Reply'

interface Props {
  postId: number
  userInfo: UserInfoType
  setCommentInfoToUpdate: (commentInfoToEdit: CommentInfoType | null) => void
  showCertified: boolean
  setRefId: (refId: number) => void
  commentWritingInputRef: React.RefObject<HTMLTextAreaElement>
}

function CommentListSection({ postId, userInfo, setCommentInfoToUpdate, showCertified, setRefId, commentWritingInputRef }: Props) {
  const router = useRouter()

  const { data: commentsInfoList } = useQuery<CommentInfoType[]>(
    postKeys.comments(postId),
    () => getAllCommentInfoByPostId(postId, userInfo.userId),
    {
      enabled: !!userInfo.userId && !!postId,
      staleTime: 30000,
      cacheTime: Infinity
    }
  )

  return (
    <section>
      {commentsInfoList?.map((commentInfo) =>
        <>
          <Comment
            key={commentInfo.commentId}
            router={router}
            commentInfo={commentInfo}
            userInfo={userInfo}
            setCommentInfoToUpdate={setCommentInfoToUpdate}
            showCertified={showCertified}
            setRefId={setRefId}
            commentWritingInputRef={commentWritingInputRef}
          />
          {commentInfo.replyList?.map((replyInfo) =>
            <Reply
              key={replyInfo.commentId}
              router={router}
              replyInfo={replyInfo}
              userInfo={userInfo}
              setReplyInfoToUpdate={setCommentInfoToUpdate}
              showCertified={showCertified}
            />
          )}
        </>
      )}
    </section>
  )
}

export default CommentListSection