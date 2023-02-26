import { NextPage } from 'next'
import { useRouter } from 'next/router'

const AddComment: NextPage = () => {
  const router = useRouter()
  const postId: number = parseInt(router.query.postId as string)

  return (
    <div>

    </div>
  )
}

export default AddComment