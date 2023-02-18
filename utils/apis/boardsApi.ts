import { ec2 } from './apiConfig'
import { BoardInfoType } from '../types/responseTypes'

export const getAllBoardsInfo = async (): Promise<BoardInfoType[]> => {
  const res = await ec2.get<BoardInfoType[]>('/boards')
  return res.data
}