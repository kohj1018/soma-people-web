import { BoardInfoType } from './types/responseTypes'

export const VERSION: string = '0.2.1'
export const THIS_YEAR_CARDINAL_NUM: number = 14  // 올해 기수
export const PREP_STUDENT_CARDINAL_NUM: number = 15 // 준비생 기수
export const traineeBoardInfoList: BoardInfoType[] = [
  {
    boardId: parseInt('1' + THIS_YEAR_CARDINAL_NUM),
    name: '자유게시판'
  },
  {
    boardId: 11,
    name: '팀원 모집'
  },
  {
    boardId: 10,
    name: '연수생 공지사항'
  }
]