import { BoardInfoType } from '../../../utils/types/responseTypes'

interface Props {
  boardInfoList: BoardInfoType[]
  boardIdOfLastViewed: number
  setBoardIdOfLastViewed: (boardIdOfLastViewed: number) => void
}

function MobileBoardTap({ boardInfoList, boardIdOfLastViewed, setBoardIdOfLastViewed }: Props) {
  return (
    <nav className='fixed top-14 inset-x-0 px-5 pt-4 space-x-6 bg-white whitespace-nowrap overflow-x-scroll hide-scrollbar border-b border-gray-100 z-50'>
      {boardInfoList.map((boardInfo) =>
        <button
          key={boardInfo.boardId}
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