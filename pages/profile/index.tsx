import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import MainArea from '../../components/layout/MainArea'
import profilePageBackGround from '../../public/profilePageBackGround.svg'
import Image from 'next/image'
import useUserInfo from '../../hooks/useUserInfo'
import UserTypeTag from '../../components/tag/UserTypeTag'
import LoadingCircular from '../../components/layout/LoadingCircular'
import Link from 'next/link'
import Mode from '@mui/icons-material/Mode'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import VerifiedUser from '@mui/icons-material/VerifiedUser'
import { VERSION } from '../../utils/config'

const Profile: NextPage = () => {
  const userInfo = useUserInfo()

  if (!userInfo) return <LoadingCircular />

  return (
    <MainContainer>
      <header className='absolute top-0 inset-x-0 px-5 py-3.5 bg-zinc-900'>
        <h1 className='text-xl font-semibold text-white'>프로필</h1>
      </header>

      <MainArea className='relative px-5 pb-8'>
        <Image
          src={profilePageBackGround}
          className='absolute top-14 inset-x-0 h-auto z-0 lg:hidden'
          alt='배경 이미지'
        />

        <section className='relative mt-8 space-y-4 z-10'>
          {/* 프로필 정보 */}
          <article className='p-7 rounded bg-white shadow-profileCard'>
            <header className='flex items-center space-x-2'>
              <p className='text-xl font-semibold text-gray-900'>{userInfo.name}</p>
              <UserTypeTag userType={userInfo.userType} cardinalNum={userInfo.cardinalNum} isAnonymous={false} />
            </header>
            <section className='mt-6 space-y-3'>
              <Link
                href='/'
                className='px-4 py-3 flex items-center justify-between rounded bg-gray-50'
              >
                <div className='flex items-center space-x-2'>
                  <Mode className='!w-5 !h-5 text-gray-300' />
                  <p className='text-base font-medium text-gray-700'>작성한 글</p>
                  <div className='px-2 py-0.5 flex items-center justify-center rounded-full bg-gray-100'>
                    <p className='text-sm font-semibold text-blue-700'>{userInfo.numOfPostsWritten}</p>
                  </div>
                </div>
                <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
              </Link>
              <Link
                href='/'
                className='px-4 py-3 flex items-center justify-between rounded bg-gray-50'
              >
                <div className='flex items-center space-x-2'>
                  <Mode className='!w-5 !h-5 text-gray-300' />
                  <p className='text-base font-medium text-gray-700'>답변한 글</p>
                  <div className='px-2 py-0.5 flex items-center justify-center rounded-full bg-gray-100'>
                    <p className='text-sm font-semibold text-blue-700'>{userInfo.numOfCommentsWritten}</p>
                  </div>
                </div>
                <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
              </Link>
            </section>
          </article>

          {/* 소마인 인증 */}
          <Link
            href='/profile/certification'
            className='block p-4 space-y-2 rounded bg-white shadow-profileCard'
          >
            <header className='w-full flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <VerifiedUser className='!w-6 !h-6 text-blue-500' />
                <p className='text-base font-semibold text-gray-900'>소마인 인증하기</p>
              </div>
              <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
            </header>
            <p className='text-sm font-medium text-gray-400'>소마인 인증을 받으면 연수생/수료생 게시판을 이용할 수 있어요!</p>
          </Link>
        </section>

        {/* 서비스 목록 */}
        <article className='mt-10 space-y-3'>
          <header className='text-sm font-medium text-gray-400'>서비스</header>
          <section className='space-y-6'>
            <Link
              href='/customerService'
              className='w-full flex items-center justify-between'
            >
              <p className='text-base font-medium text-gray-900'>문의/건의하기</p>
              <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
            </Link>
            <a
              href='https://somapeople.notion.site/d02962c43454426cbd5d1b2c965af90a'
              className='w-full flex items-center justify-between'
            >
              <p className='text-base font-medium text-gray-900'>서비스이용약관</p>
              <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
            </a>
            <a
              href='https://somapeople.notion.site/d81fc7603cc74e6a8b26341b18d83561'
              className='w-full flex items-center justify-between'
            >
              <p className='text-base font-medium text-gray-900'>개인정보처리방침</p>
              <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
            </a>
            <Link
              href='/profile/accountManagement'
              className='w-full flex items-center justify-between'
            >
              <p className='text-base font-medium text-gray-900'>계정관리</p>
              <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
            </Link>
          </section>
        </article>

        {/* 기타 목록 */}
        <article className='mt-10 space-y-3'>
          <header className='text-sm font-medium text-gray-400'>기타</header>
          <section className='space-y-6'>
            <a
              href='https://somapeople.notion.site/c296bd79d0b543ce8b977a55eb303ef5'
              className='w-full flex items-center justify-between'
            >
              <p className='text-base font-medium text-gray-900'>공지사항</p>
              <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
            </a>
            <div className='w-full flex items-center justify-between'>
              <p className='text-base font-medium text-gray-900'>앱버전</p>
              <p className='text-base font-semibold text-gray-600 lg:text-xl'><span className='text-sm font-semibold text-blue-500 lg:text-base'>beta </span>{VERSION}</p>
            </div>
          </section>
        </article>
      </MainArea>
    </MainContainer>
  )
}

export default Profile