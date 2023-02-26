import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MainContainer from '../../../components/layout/MainContainer'

const PostDetail: NextPage = () => {
  const router = useRouter()
  const postId: number = parseInt(router.query.postId as string)

  return (
    <MainContainer>

    </MainContainer>
  )
}

export default PostDetail