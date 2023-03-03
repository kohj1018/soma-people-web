import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PostInfoType } from '../utils/types/responseTypes'
import { useSnackbarOpenStore } from '../stores/stores'
import MainContainer from '../components/layout/MainContainer'
import MainArea from '../components/layout/MainArea'
import SEO from '../components/SEO'
import DisabledByDefault from '@mui/icons-material/DisabledByDefault'
import { Search as SearchIcon } from '@mui/icons-material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import PostPreview from '../components/common/PostPreview'
import { isNotEmptyArray } from '../utils/functions/isNotEmptyArray'
import LoadingCircular from '../components/layout/LoadingCircular'
import { searchPostInfoList } from '../utils/apis/postsApi'
import useSignInInfo from '../hooks/useSignInInfo'
import Image from 'next/image'
import noSearchResultIcon from '../public/icon/noSearchResultIcon.svg'

const Search: NextPage = () => {
  const router = useRouter()
  const { userId } = useSignInInfo()
  const boardId: number = parseInt(router.query.boardId as string) ?? 0
  const boardName: string = router.query.boardName as string ?? '통합'
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResult, setSearchResult] = useState<PostInfoType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setMessage } = useSnackbarOpenStore()

  // 검색어가 바뀌면 검색
  useEffect(() => {
    if (router.query.searchTerm && userId) {
      setIsLoading(true)
      ;(() => {
        searchPostInfoList(router.query.searchTerm as string, boardId, userId)
          .then((res) => {
            if (!isNotEmptyArray(res)) {
              setMessage('검색 결과가 없습니다 😥')
            }
            setSearchResult(res)
            setSearchTerm(router.query.searchTerm as string)
          })
          .catch(() => setMessage('문제가 발생했습니다.'))
          .finally(() => setIsLoading(false))
      })()
    }
  }, [router.query.searchTerm, userId])

  // 검색 실행 함수
  const submitSearchTerm = () => {
    if (!!searchTerm && searchTerm.replace(/\s/g, '')) {  // 공백만 있는 경우 검색 안함
      router.replace({
        query: {
          boardId: boardId,
          boardName: boardName,
          searchTerm: searchTerm
        }
      })
    }
  }

  return (
    <MainContainer>
      <SEO title={!!searchTerm ? `${searchTerm} : ${boardName} 검색` : '검색'} />

      <header className='fixed h-14 top-0 w-screen px-5 py-2.5 flex items-center justify-between space-x-4 bg-white z-50 lg:hidden'>
        <button onClick={() => router.back()}>
          <KeyboardArrowLeft className='w-6 h-6 text-gray-700' />
        </button>
        <div className='w-full pl-4 pr-2 py-1.5 flex items-center justify-between space-x-1 bg-gray-100 rounded'>
          <input
            type='text'
            className='w-full bg-gray-100 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none'
            placeholder='검색어를 입력해주세요'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submitSearchTerm() }}
            required
          />
          <button onClick={() => setSearchTerm('')}>
            <DisabledByDefault className='w-6 h-6 text-gray-300' />
          </button>
        </div>
        <button onClick={submitSearchTerm}>
          <SearchIcon className='!w-6 !h-6 text-gray-700' />
        </button>
      </header>


      <MainArea className='relative min-h-screen px-5'>
        {!isLoading ? (
          <>
            <div className='mt-6 flex items-center space-x-1 text-gray-400'>
              <SearchIcon className='!w-4 !h-4' />
              <h2 className='text-sm font-medium'>{`${boardName} 검색 · 총 검색결과 ${searchResult.length}건`}</h2>
            </div>

            <section className='mt-2'>
              {isNotEmptyArray(searchResult) ? (
                searchResult.map((postInfo) =>
                  <PostPreview key={postInfo.postId} postInfo={postInfo} />
                )
              ) : (
                <div className='moveToCenter flex flex-col items-center space-y-5'>
                  <Image
                    src={noSearchResultIcon}
                    className='!w-15 !h-15'
                    alt='검색 결과 없음 아이콘'
                  />
                  <p className='text-base font-semibold text-gray-400'>검색 결과가 없어요</p>
                </div>
              )}
            </section>
          </>
        ) : (
          <LoadingCircular />
        )}
      </MainArea>
    </MainContainer>
  )
}

export default Search