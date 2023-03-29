import type { NextPage } from 'next'
import MainContainer from '../components/layout/MainContainer'
import MainArea from '../components/layout/MainArea'
import Image from 'next/image'
import mainLogo from '../public/mainLogo.svg'
import banner from '../public/banner/banner.svg'
import noticeIcon from '../public/icon/noticeIcon.svg'
import scheduleIcon from '../public/icon/scheduleIcon.svg'
import somaHomePageIcon from '../public/icon/somaHomePageIcon.svg'
import peopleIcon from '../public/icon/peopleIcon.svg'
import Link from 'next/link'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useQuery } from '@tanstack/react-query'
import { postKeys } from '../utils/constants/reactQueryKeyConstants'
import { getPostFromEachBoard } from '../utils/apis/postsApi'
import LoadingCircular from '../components/layout/LoadingCircular'
import QuestionAnswer from '@mui/icons-material/QuestionAnswer'
import Search from '@mui/icons-material/Search'
import React, { useEffect, useState } from 'react'
import DisabledByDefault from '@mui/icons-material/DisabledByDefault'
import QnAPreview from '../components/common/QnAPreview'
import { useBoardIdOfLastViewedStore, useIsFirstLoadStore } from '../stores/stores'
import { useRouter } from 'next/router'
import useUserInfo from '../hooks/useUserInfo'
import SearchModal from '../components/common/SearchModal'
import SEO from '../components/SEO'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useMainPageScrollYStore } from '../stores/scrollStore/scrollStores'
import useKeepScrolling from '../hooks/useKeepScrolling'
import memoIcon from '../public/icon/memoIcon.svg'
import { isNotEmptyArray } from '../utils/functions/isNotEmptyArray'
import { afterLoadingIsComplete } from '../utils/functions/flutterBridgeFunc/afterLoadingIsComplete'

const Home: NextPage = () => {
  const router = useRouter()
  const userInfo = useUserInfo()
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { setBoardIdOfLastViewed } = useBoardIdOfLastViewedStore()
  const { mainPageScrollY, setMainPageScrollY } = useMainPageScrollYStore()
  const { isFirstLoad, setIsFirstLoad } = useIsFirstLoadStore()
  const { data: mainPagePostSummaryData, isLoading } = useQuery(
    postKeys.mainPageSummary(userInfo?.userId ?? 0),
    () => getPostFromEachBoard(userInfo?.userId ?? 0),
    {
      enabled: !!userInfo?.userId,
      staleTime: 60000,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        if (!!userInfo && isFirstLoad) {  // 앱 실행 후, 첫 번째 로딩에만 아래 함수를 실행
          afterLoadingIsComplete(userInfo.userId, navigator.userAgent)
          setIsFirstLoad(false) // 위 함수가 다시 실행되지 않도록 false로 변경
        }
      }
    }
  )

  // 스크롤 위치 유지
  useKeepScrolling(mainPageScrollY)

  // 인증받지 않은 사람들은 준비생 게시판으로 포커싱
  useEffect(() => {
    if (!!userInfo && !userInfo.isCertified) {
      setBoardIdOfLastViewed(4)
    }
  }, [userInfo])



  // 게시판으로 이동하기 함수
  const moveToBoardPage = (boardId: number) => {
    setMainPageScrollY(window.scrollY)  // 클릭할 때 window.scrollY 저장
    setBoardIdOfLastViewed(boardId)
    router.push('/board')
  }

  if (isLoading) return <LoadingCircular />

  return (
    <MainContainer showFooterOnMobile={true}>
      <SEO title='소마인 : 소프트웨어 마에스트로 커뮤니티' />

      <header className='fixed h-14 top-0 inset-x-0 px-5 flex items-center justify-between bg-zinc-900 z-50 lg:hidden'>
        <Image
          src={mainLogo}
          className='w-[6.8125rem] h-7'
          alt='소마인 로고'
          priority
        />
        <div className='flex items-center justify-end space-x-3'>
          {!!userInfo?.isCertified &&
            <>
              <button
                onClick={() => setIsSearchMode(true)}
                className={(isSearchMode ? ' hidden' : ' inline')}
              >
                <Search className='w-6 h-6 text-white' />
              </button>

              <SearchModal
                boardId={0}
                boardName='통합'
                isSearchMode={isSearchMode}
                setIsSearchMode={setIsSearchMode}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </>
          }
          <Link href='/profile'>
            <AccountCircle className='!w-6 !h-6 text-white' />
          </Link>
        </div>

        {/* TODO: 일단 overflow-hidden으로 해놓긴 했는데 끊기는 느낌나서 추후 수정 필요 */}
        {/*<div className={'pl-4 pr-2 py-1.5 flex items-center justify-between space-x-1 bg-gray-100 rounded duration-500 overflow-hidden' + (isSearchMode ? ' visible grow' : ' invisible w-0')}>*/}
        {/*  <input*/}
        {/*    type='text'*/}
        {/*    className='grow bg-gray-100 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none'*/}
        {/*    placeholder='검색어를 입력해주세요'*/}
        {/*    value={searchTerm}*/}
        {/*    onChange={(e) => setSearchTerm(e.target.value)} // 모바일 환경에서는 maxLength 속성이 먹히지 않기 때문에 js 추가*/}
        {/*    required*/}
        {/*  />*/}
        {/*  <button onClick={cancelSearch}>*/}
        {/*    <DisabledByDefault className='w-6 h-6 text-gray-300' />*/}
        {/*  </button>*/}
        {/*</div>*/}
      </header>

      <MainArea className='min-h-screen bg-gray-50'>
        <Image
          src={banner}
          className='w-full h-auto'
          alt='배너'
          priority
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
              priority
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
              priority
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
              priority
            />
            <p className='text-sm font-medium text-slate-400'>소마홈피</p>
          </a>
          <button
            onClick={() => moveToBoardPage(114)}
            className='flex flex-col items-center space-y-1'
          >
            <Image
              src={peopleIcon}
              className='h-9'
              alt='14기 연수생 아이콘'
              priority
            />
            <p className='text-sm font-medium text-slate-400'>14기 연수생</p>
          </button>
        </article>

        {/* 게시판 미리보기 */}
        <section className='mt-2 space-y-2'>
          {/* Q&A 게시판 미리보기 */}
          <article className='py-8 space-y-6 bg-white'>
            <button
              onClick={() => moveToBoardPage(2)}
              className='w-full px-5 flex items-center justify-between'
            >
              <p className='text-lg font-semibold text-gray-900'>최근에 올라온 Q&A 💬</p>
              <KeyboardArrowRight className='w-6 h-6 text-gray-300' />
            </button>

            <section className='px-5 flex items-center space-x-4 overflow-x-scroll whitespace-nowrap hide-scrollbar'>
              {isNotEmptyArray(mainPagePostSummaryData?.qnaPostList) ? (
                mainPagePostSummaryData?.qnaPostList.map((post) =>
                  <QnAPreview
                    key={post.postId}
                    postId={post.postId}
                    title={post.title}
                    userType={post.user.userType}
                    cardinalNum={post.user.cardinalNum}
                    isAnonymous={post.isAnonymous}
                    commentsNum={post.commentsNum}
                    createdAt={post.createdAt}
                  />
                )
              ) : (
                <EmptyPostsNotice />
              )}
            </section>
          </article>

          <article className='pt-8 px-5 bg-white'>
            <button
              onClick={() => moveToBoardPage(1)}
              className='w-full flex items-center justify-between'
            >
              <p className='text-lg font-semibold text-gray-900'>자유게시판 🧑‍💻</p>
              <KeyboardArrowRight className='w-6 h-6 text-gray-300' />
            </button>
            <section className='py-2.5'>
              {isNotEmptyArray(mainPagePostSummaryData?.freePostList) ? (
                mainPagePostSummaryData?.freePostList.map((post) =>
                  <Link
                    key={post.postId}
                    href={`/post/${post.postId}`}
                    className='py-3.5 flex items-center justify-between border-b border-gray-100 last:border-none'
                    onClick={() => setMainPageScrollY(window.scrollY)}
                  >
                    <p className='grow text-sm font-medium text-gray-700 truncate'>{post.title}</p>
                    <div className='flex items-center space-x-1.5'>
                      <QuestionAnswer className='!w-4 !h-4 text-gray-200' />
                      <p className='text-sm font-semibold text-gray-500'>{post.commentsNum}</p>
                    </div>
                  </Link>
                )
              ) : (
                <EmptyPostsNotice />
              )}
            </section>
          </article>

          <article className='pt-8 px-5 pb-7 bg-white'>
            <button
              onClick={() => moveToBoardPage(4)}
              className='w-full flex items-center justify-between'
            >
              <p className='text-lg font-semibold text-gray-900'>14기 준비생들을 도와주세요! 🙇‍♀️</p>
              <KeyboardArrowRight className='w-6 h-6 text-gray-300' />
            </button>
            <section className='py-2.5'>
              {isNotEmptyArray(mainPagePostSummaryData?.applicantPostList) ? (
                mainPagePostSummaryData?.applicantPostList.map((post) =>
                  <Link
                    key={post.postId}
                    href={`/post/${post.postId}`}
                    className='py-3.5 flex items-center justify-between border-b border-gray-100 last:border-none'
                    onClick={() => setMainPageScrollY(window.scrollY)}
                  >
                    <p className='grow text-sm font-medium text-gray-700 truncate'>{post.title}</p>
                    <div className='flex items-center space-x-1.5'>
                      <QuestionAnswer className='!w-4 !h-4 text-gray-200' />
                      <p className='text-sm font-semibold text-gray-500'>{post.commentsNum}</p>
                    </div>
                  </Link>
                )
              ) : (
                <EmptyPostsNotice />
              )}
            </section>
          </article>
        </section>
      </MainArea>
    </MainContainer>
  )
}

export default Home

function EmptyPostsNotice() {
  return (
    <div className='w-full py-5 flex items-center justify-center rounded bg-gray-50'>
      <div className='flex flex-col items-center space-y-2'>
        <Image
          src={memoIcon}
          className='!w-9 !h-9'
          alt='작성된 글 없음 안내 아이콘'
        />
        <p className='text-sm font-semibold text-blue-400'>아직 작성된 글이 없어요</p>
      </div>
    </div>
  )
}