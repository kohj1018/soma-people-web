import Comment from './Comment'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { CommentInfoType, UserInfoType } from '../../utils/types/responseTypes'
import { postKeys } from '../../utils/constants/reactQueryKeyConstants'
import { getAllCommentInfoByPostId } from '../../utils/apis/commentsApi'
import { useRouter } from 'next/router'

interface Props {
  postId: number
  userInfo: UserInfoType
  setCommentInfoToUpdate: (commentInfoToEdit: CommentInfoType | null) => void
}

function CommentListSection({ postId, userInfo, setCommentInfoToUpdate }: Props) {
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
    <section className='mt-4 space-y-4'>
      {commentsInfoList?.map((commentInfo) =>
        <Comment
          key={commentInfo.commentId}
          router={router}
          commentInfo={commentInfo}
          userInfo={userInfo}
          setCommentInfoToUpdate={setCommentInfoToUpdate}
        />
      )}
    </section>
  )
}

export default CommentListSection