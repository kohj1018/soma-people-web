import { BoardInfoType } from '../../../utils/types/responseTypes'
import { useEffect, useRef } from 'react'
import { useBoardTapScrollXStore } from '../../../stores/stores'

interface Props {
  boardInfoList: BoardInfoType[]
  boardIdOfLastViewed: number
  setBoardIdOfLastViewed: (boardIdOfLastViewed: number) => void
}

function MobileBoardTap({ boardInfoList, boardIdOfLastViewed, setBoardIdOfLastViewed }: Props) {
  // TODO : 가로 스크롤 유지 나중에 다시 시도해보기
  // const boardTapRef = useRef<HTMLDivElement>(null)
  // const { boardTapScrollX, setBoardTapScrollX } = useBoardTapScrollXStore()
  const selectedTapRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!!selectedTapRef.current) {
      selectedTapRef.current.scrollIntoView()
    }
  }, [boardIdOfLastViewed])

  // useEffect(() => {
  //   if (boardTapScrollX !== 0 && boardTapRef.current) {
  //     boardTapRef.current.scrollTo({ left: boardTapScrollX })
  //   }
  // }, [boardTapRef])

  // useEffect(() => {
  //
  //   if (boardTapScrollX !== 0 && !!boardTapRef.current) {
  //     // console.log("boardTapScrollX.scrollLeft : ", boardTapScrollX.scrollLeft)
  //     // boardTapRef.current?.scrollTo({ left: boardTapScrollX.scrollLeft })
  //     // boardTapRef.current.scrollLeft = boardTapScrollX
  //     // console.log("boardTapScrollX : ", boardTapScrollX)
  //     // console.log("boardTapRef.current.scrollLeft : ", boardTapRef.current.scrollLeft)
  //     // boardTapScrollX.scrollIntoView()
  //     console.log("실행되나여")
  //     boardTapRef.current.scrollLeft = boardTapScrollX
  //     // boardTapRef.current.scrollTo(boardTapScrollX, 0)
  //     // window.scrollTo(0, boardTapScrollX)
  //   }
  // }, [])
  //
  // useEffect(() => {
  //   console.log("boardTapScrollX : ", boardTapScrollX)
  // }, [boardTapScrollX])
  //
  // useEffect(() => {
  //   // if (boardTapScrollX !== 0 && boardTapRef.current) {
  //   //   console.log("저장하려는 scrollLeft : ", boardTapRef.current?.scrollLeft)
  //   // }
  //
  //   // if (boardTapRef.current && selectedTapRef.current) {
  //   //   setBoardTapScrollX(boardTapRef.current.scrollLeft)
  //   //   selectedTapRef.current.scrollIntoView()
  //   // }
  //
  //   // if (selectedTapRef.current) {
  //   //   console.log("selectedTapRef.current : ", selectedTapRef.current)
  //   //   selectedTapRef.current.scrollIntoView()
  //   // }
  //
  //   if (!!boardTapRef.current) {
  //     // console.log("selectedTapRef.current.scrollWidth : ", selectedTapRef.current?.scrollWidth)
  //     // console.log("boardTapRef.current?.scrollLeft : ", boardTapRef.current?.scrollLeft)
  //     // selectedTapRef.current?.scrollIntoView()
  //     if (boardTapRef.current.scrollLeft !== 0) {
  //       setBoardTapScrollX(boardTapRef.current.scrollLeft)
  //     }
  //   }
  //
  //   // console.log("store에 저장되어 있는 ScrollX : ", boardTapScrollX)
  // }, [boardIdOfLastViewed])

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