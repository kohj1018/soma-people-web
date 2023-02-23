import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
      <h1 className="text-3xl font-bold underline">
        Hello world!
        <Link
          href={{
            pathname: '/customerService/report',
            query: {
              reportTargetId: 1,
              reportTargetType: '게시글',
              reportTargetTitle: '이게 맞나요?'
            }
          }}
        >
          신고하기
        </Link>
      </h1>
  )
}

export default Home