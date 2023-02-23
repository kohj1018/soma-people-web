import type { NextPage } from 'next'
import MainContainer from '../components/layout/MainContainer'
import MainArea from '../components/layout/MainArea'
import Image from 'next/image'
import mainLogo from '../public/mainLogo.svg'
import Search from '@mui/icons-material/Search'
import useUserInfo from '../hooks/useUserInfo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const router = useRouter()
  const userInfo = useUserInfo()

  return (
    <MainContainer>
      <header className='absolute top-0 inset-x-0 px-5 py-3 flex items-center justify-between bg-zinc-900'>
        <div className='relative w-8 h-8'>
          <Image
            src={mainLogo}
            fill
            className='object-contain'
            alt='소마인 로고'
          />
        </div>

        <button>
          <Search className='w-6 h-6 text-white' />
        </button>
      </header>

      <MainArea>
      </MainArea>
    </MainContainer>
  )
}

export default Home


// <Link
// href={{
//   pathname: '/customerService/report',
//     query: {
//     reportTargetId: 1,
//       reportTargetType: '게시글',
//       reportTargetTitle: '이게 맞나요?'
//   }
// }}
// >
// 신고하기
// </Link>