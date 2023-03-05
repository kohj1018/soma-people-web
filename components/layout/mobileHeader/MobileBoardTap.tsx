import { BoardInfoType } from '../../../utils/types/responseTypes'
import { useEffect, useRef } from 'react'

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

  // // 가로 스크롤 유지
  // useEffect(() => {
  //   if (boardTapScrollX !== 0) {
  //     setTimeout(() => {
  //       if (boardTapRef.current) {
  //         console.log('scrollX : ', boardTapScrollX)
  //         boardTapRef.current.scrollTo(boardTapScrollX, 0)
  //       }
  //     }, 2)
  //   }
  // }, [boardTapRef])

  // 선택한 탭으로 포커싱
  useEffect(() => {
    if (!!selectedTapRef.current) {
      selectedTapRef.current.scrollIntoView()
      // if (boardTapRef.current && boardTapRef.current.scrollLeft !== 0) setBoardTapScrollX(boardTapRef.current.scrollLeft)
    }
  }, [boardIdOfLastViewed])

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