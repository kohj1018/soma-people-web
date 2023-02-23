import type { NextPage } from 'next'
import MainContainer from '../components/layout/MainContainer'
import MainArea from '../components/layout/MainArea'
import Image from 'next/image'
import mainLogo from '../public/mainLogo.svg'
import useUserInfo from '../hooks/useUserInfo'
import { useRouter } from 'next/router'
import banner from '../public/banner.svg'
import noticeIcon from '../public/icon/noticeIcon.svg'
import scheduleIcon from '../public/icon/scheduleIcon.svg'
import somaHomePageIcon from '../public/icon/somaHomePageIcon.svg'
import peopleIcon from '../public/icon/peopleIcon.svg'
import Link from 'next/link'

const Home: NextPage = () => {
  const router = useRouter()
  const userInfo = useUserInfo()

  return (
    <MainContainer>
      <header className='fixed top-0 inset-x-0 px-5 py-3 flex items-center justify-between bg-zinc-900 z-50'>
        <Image
          src={mainLogo}
          className='w-8 h-8'
          alt='소마인 로고'
        />
      </header>

      <MainArea className='min-h-screen bg-gray-50'>
        <Image
          src={banner}
          className='w-full h-auto'
          alt='배너'
        />
        <article className='py-6 flex items-center justify-center space-x-6 bg-white'>
          <a
            href='https://www.swmaestro.org/sw/bbs/B0000002/list.do?menuNo=200019'
            className='flex flex-col items-center space-y-1'
          >
            <Image
              src={noticeIcon}
              className='h-9'
              alt='소마공지 아이콘'
            />
            <p className='text-sm font-medium text-slate-400'>소마공지</p>
          </a>
          <a
            href='https://www.swmaestro.org/sw/main/contents.do?menuNo=200033'
            className='flex flex-col items-center space-y-1'
          >
            <Image
              src={scheduleIcon}
              className='h-9'
              alt='소마일정 아이콘'
            />
            <p className='text-sm font-medium text-slate-400'>소마일정</p>
          </a>
          <a
            href='https://www.swmaestro.org/sw/main/main.do'
            className='flex flex-col items-center space-y-1'
          >
            <Image
              src={somaHomePageIcon}
              className='h-9'
              alt='소마홈피 아이콘'
            />
            <p className='text-sm font-medium text-slate-400'>소마홈피</p>
          </a>
          <Link
            href='/'
            className='flex flex-col items-center space-y-1'
          >
            <Image
              src={peopleIcon}
              className='h-9'
              alt='14기 준비 아이콘'
            />
            <p className='text-sm font-medium text-slate-400'>14기 준비</p>
          </Link>
        </article>
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