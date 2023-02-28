import { useQuery } from '@tanstack/react-query'
import { boardKeys } from '../utils/constants/reactQueryKeyConstants'
import { getAllBoardsInfo } from '../utils/apis/boardsApi'
import { useEffect, useState } from 'react'
import { BoardInfoType, UserInfoType } from '../utils/types/responseTypes'
import { useBoardIdOfLastViewedStore } from '../stores/stores'

function useBoardInfoList(userInfo: UserInfoType | null): BoardInfoType[] { //TODO: 추후 최적화 할 수 있는 부분 찾아보기 (현재 계속 랜더링 됨)
  const { data: boardInfoList } = useQuery(
    boardKeys.lists(),
    getAllBoardsInfo,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false
    }
  )
  const { setBoardIdOfLastViewed } = useBoardIdOfLastViewedStore()
  const [returnBoardInfoList, setReturnBoardInfoList] = useState<BoardInfoType[]>([])

  // 해당 유저에게 보여지는 게시판의 종류를 처리하는 부분
  useEffect(() => {
    if (!!boardInfoList && !!userInfo) {
      if (!userInfo.isCertified) {  // 소마인 인증 안했다면 준비생 게시판만 볼 수 있음
        setBoardIdOfLastViewed(4)
        setReturnBoardInfoList(boardInfoList.filter((boardInfo) => boardInfo.boardId === 4))
      } else {
        switch (userInfo.userType) {
          case '준비생':
            setBoardIdOfLastViewed(4)
            setReturnBoardInfoList(boardInfoList.filter((boardInfo) => boardInfo.boardId === 4))
            break
          case '연수생':
            setReturnBoardInfoList([
              boardInfoList[0],
              boardInfoList[1],
              boardInfoList[2],
              boardInfoList.find((boardInfo) =>
                boardInfo.boardId === parseInt('1' + userInfo.cardinalNum)) as BoardInfoType,
              boardInfoList[3]
            ])
            break
          case '멘토':
            setReturnBoardInfoList([
              boardInfoList[0],
              boardInfoList[1],
              boardInfoList[2],
              boardInfoList.find((boardInfo) =>
                boardInfo.boardId === 100) as BoardInfoType,
              boardInfoList[3]
            ])
            break
          case '사무국':
            setReturnBoardInfoList(boardInfoList)
            break
          default:
            break
        }
      }
    }
  }, [userInfo])

  return returnBoardInfoList
}

export default useBoardInfoList