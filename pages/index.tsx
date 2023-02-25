import type { NextPage } from 'next'
import MainContainer from '../components/layout/MainContainer'
import MainArea from '../components/layout/MainArea'
import Image from 'next/image'
import mainLogo from '../public/mainLogo.svg'
import { useRouter } from 'next/router'
import banner from '../public/banner.svg'
import noticeIcon from '../public/icon/noticeIcon.svg'
import scheduleIcon from '../public/icon/scheduleIcon.svg'
import somaHomePageIcon from '../public/icon/somaHomePageIcon.svg'
import peopleIcon from '../public/icon/peopleIcon.svg'
import Link from 'next/link'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useQuery } from '@tanstack/react-query'
import { MAIN_PAGE_POST_SUMMARY } from '../utils/constants/reactQueryKeyConstants'
import { getPostFromEachBoard } from '../utils/apis/postsApi'
import LoadingCircular from '../components/layout/LoadingCircular'
import QuestionAnswer from '@mui/icons-material/QuestionAnswer'
import useSignInInfo from '../hooks/useSignInInfo'
import Search from '@mui/icons-material/Search'
import React, { useState } from 'react'
import DisabledByDefault from '@mui/icons-material/DisabledByDefault'
import QnAPreview from '../components/common/QnAPreview'

const Home: NextPage = () => {
  const router = useRouter()
  const { userId } = useSignInInfo()
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { data: mainPagePostSummaryData, isLoading } = useQuery(
    [MAIN_PAGE_POST_SUMMARY, userId],
    () => getPostFromEachBoard(userId ?? 0),
    {
      enabled: !!userId,
      staleTime: 60000
    }
  )

  const cancelSearch = () => {
    if (searchTerm) {
      setSearchTerm('')
    } else {
      setIsSearch(false)
    }
  }

  if (isLoading) return <LoadingCircular />

  return (
    <MainContainer>
      <header className='fixed h-14 top-0 inset-x-0 px-5 flex items-center justify-between bg-zinc-900 z-50 lg:hidden'>
        <Image
          src={mainLogo}
          className='w-8 h-8 mr-1'
          alt='소마인 로고'
        />
        <button
          onClick={() => setIsSearch(true)}
          className={'absolute right-5' + (isSearch ? ' hidden' : ' inline')}
        >
          <Search className='w-6 h-6 text-white' />
        </button>
        {/* TODO: 일단 overflow-hidden으로 해놓긴 했는데 끊기는 느낌나서 추후 수정 필요 */}
        <div className={'pl-4 pr-2 py-1.5 flex items-center space-x-1 bg-gray-100 rounded duration-500 overflow-hidden' + (isSearch ? ' visible grow' : ' invisible w-0')}>
          <input
            type='text'
            className='grow bg-gray-100 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none'
            placeholder='검색어를 입력해주세요'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 모바일 환경에서는 maxLength 속성이 먹히지 않기 때문에 js 추가
            required
          />
          <button onClick={cancelSearch}>
            <DisabledByDefault className='w-6 h-6 text-gray-300' />
          </button>
        </div>
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

        {/* 게시판 미리보기 */}
        <section className='mt-2 space-y-2'>
          {/* Q&A 게시판 미리보기 */}
          <article className='py-8 space-y-6 bg-white'>
            <Link href='/' className='w-full px-5 flex items-center justify-between'>
              <p className='text-lg font-semibold text-gray-900'>최근에 올라온 Q&A 💬</p>
              <KeyboardArrowRight className='w-6 h-6 text-gray-300' />
            </Link>

            <section className='px-5 flex flex items-center space-x-4 overflow-x-scroll whitespace-nowrap hide-scrollbar'>
              {mainPagePostSummaryData?.qnaPostList.map((post) =>
                <QnAPreview
                  key={post.postId}
                  title={post.title}
                  userType={post.user.userType}
                  cardinalNum={post.user.cardinalNum}
                  isAnonymous={post.isAnonymous}
                  commentsNum={post.commentsNum}
                  createdAt={post.createdAt}
                />
              )}
            </section>
          </article>

          <article className='pt-8 px-5 bg-white'>
            <Link href='/' className='w-full flex items-center justify-between'>
              <p className='text-lg font-semibold text-gray-900'>자유게시판 🧑‍💻</p>
              <KeyboardArrowRight className='w-6 h-6 text-gray-300' />
            </Link>
            <section className='py-2.5'>
              {mainPagePostSummaryData?.freePostList.map((post) =>
                <Link
                  key={post.postId}
                  href='/'
                  className='py-3.5 flex items-center justify-between border-b border-gray-100 last:border-none'
                >
                  <p className='grow text-sm font-medium text-gray-700 truncate'>{post.title}</p>
                  <div className='flex items-center space-x-1.5'>
                    <QuestionAnswer className='w-4 h-4 text-gray-200' />
                    <p className='text-sm font-semibold text-gray-500'>{post.commentsNum}</p>
                  </div>
                </Link>
              )}
            </section>
          </article>

          <article className='pt-8 px-5 bg-white'>
            <Link href='/' className='w-full flex items-center justify-between'>
              <p className='text-lg font-semibold text-gray-900'>14기 준비생들을 도와주세요! 🙇‍♀️</p>
              <KeyboardArrowRight className='w-6 h-6 text-gray-300' />
            </Link>
            <section className='py-2.5'>
              {mainPagePostSummaryData?.applicantPostList.map((post) =>
                <Link
                  key={post.postId}
                  href='/'
                  className='py-3.5 flex items-center justify-between border-b border-gray-100 last:border-none'
                >
                  <p className='grow text-sm font-medium text-gray-700 truncate'>{post.title}</p>
                  <div className='flex items-center space-x-1.5'>
                    <QuestionAnswer className='w-4 h-4 text-gray-200' />
                    <p className='text-sm font-semibold text-gray-500'>{post.commentsNum}</p>
                  </div>
                </Link>
              )}
            </section>
          </article>
        </section>
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