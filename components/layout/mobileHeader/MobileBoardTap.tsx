import { BoardInfoType } from '../../../utils/types/responseTypes'
import { useEffect, useRef } from 'react'
import { useBoardTapScrollXStore } from '../../../stores/scrollStore/scrollStores'
import { useBoardRefOfLastViewedStore } from '../../../stores/stores'
import { useRouter } from 'next/router'

interface Props {
  boardInfoList: BoardInfoType[]
  boardIdOfLastViewed: number
  setBoardIdOfLastViewed: (boardIdOfLastViewed: number) => void
}

function MobileBoardTap({ boardInfoList, boardIdOfLastViewed, setBoardIdOfLastViewed }: Props) {
  // const router = useRouter()
  // TODO : 가로 스크롤 유지 나중에 다시 시도해보기
  // const boardTapRef = useRef<HTMLDivElement>(null)
  // const { boardTapScrollX, setBoardTapScrollX } = useBoardTapScrollXStore()
  const selectedTapRef = useRef<HTMLButtonElement>(null)
  // const { boardRefOfLastViewed, setBoardRefOfLastViewed } = useBoardRefOfLastViewedStore()

  // // 가로 스크롤 유지
  // useEffect(() => {
  //   if (boardTapRef.current && boardTapScrollX !== 0) {
  //     setTimeout(() => {
  //       console.log('scrollX : ', boardTapScrollX)
  //       console.log('boardTapRef : ', boardTapRef)
  //       boardTapRef.current?.scrollTo(boardTapScrollX, 0)
  //     }, 2)
  //   }
  // }, [boardTapRef])

  // useEffect(() => {
  //   console.log("들어옴 boardRefOfLastViewed.current : ", boardRefOfLastViewed?.current)
  //   if (!!boardRefOfLastViewed?.current) {
  //     boardRefOfLastViewed.current.scrollIntoView()
  //   }
  // }, [])


  // 선택한 탭으로 포커싱
  useEffect(() => {
    console.log("selectedTapRef.current : ", selectedTapRef.current)
    if (selectedTapRef.current) {
      selectedTapRef.current.scrollIntoView()
      // console.log("selectedTapRef 저장 : ", selectedTapRef)
      // setBoardRefOfLastViewed(selectedTapRef)
      // if (boardTapRef.current && boardTapRef.current.scrollLeft !== 0) setBoardTapScrollX(boardTapRef.current.scrollLeft)
    }
  }, [boardIdOfLastViewed])

  // useEffect(() => {
  //   if (boardTapRef.current) {
  //     console.log("들어옴")
  //     setBoardTapScrollX(boardTapRef.current.scrollLeft)
  //   }
  // }, [boardTapRef.current?.scrollLeft])

  return (
    <nav
      // ref={boardTapRef}
      className='fixed top-14 inset-x-0 px-5 pt-4 space-x-6 bg-white whitespace-nowrap overflow-x-scroll hide-scrollbar border-b border-gray-100 z-50'
    >
      {boardInfoList.map((boardInfo) =>
        <button
          key={boardInfo.boardId}
          ref={boardInfo.boardId === boardIdOfLastViewed ? selectedTapRef : undefined}
          onClick={() => setBoardIdOfLastViewed(boardInfo.boardId)}
          className='inline-flex flex-col space-y-[0.4375rem]'
        >
          <p className='text-base font-medium text-gray-700'>{boardInfo.name}</p>
          <span className={'w-full h-0.5 rounded-t-full bg-gray-700' + (boardIdOfLastViewed === boardInfo.boardId ? ' visible' : ' invisible')}></span>
        </button>
      )}
    </nav>
  )
}

export default MobileBoardTap