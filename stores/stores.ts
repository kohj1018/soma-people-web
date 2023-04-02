import {
  BoardIdOfLastViewedState,
  IsFirstLoadState,
  SnackbarOpenState, TraineeBoardIdOfLastViewedState,
} from './storeTypes'
import { create } from 'zustand'
import { THIS_YEAR_CARDINAL_NUM } from '../utils/config'

/** 스낵바 띄우는 Store */
export const useSnackbarOpenStore = create<SnackbarOpenState>((set) => ({
  message: '',
  setMessage: (message: string) => {
    set((state) => ({ ...state, message: message, isSnackbarOpen: true }))
  },
  isSnackbarOpen: false,
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => {
    set((state) => ({ ...state, isSnackbarOpen: isSnackbarOpen }))
  },
}))

/** 마지막으로 보고 있던 게시판 Id 관리하는 Store */
export const useBoardIdOfLastViewedStore = create<BoardIdOfLastViewedState>((set) => ({
  boardIdOfLastViewed: 1,
  setBoardIdOfLastViewed: (boardIdOfLastViewed: number) => {
    set((state) => ({ ...state, boardIdOfLastViewed: boardIdOfLastViewed }))
  }
}))

/** 앱을 실행하고 첫번째 로딩인지 체크하는 Store */
export const useIsFirstLoadStore = create<IsFirstLoadState>((set) => ({
  isFirstLoad: true,
  setIsFirstLoad: (isFirstLoad: boolean) => {
    set((state) => ({ ...state, isFirstLoad: isFirstLoad }))
  }
}))

/** 연수생 게시판들 조작 관리하는 Store */
export const useTraineeBoardIdOfLastViewedStore = create<TraineeBoardIdOfLastViewedState>((set) => ({
  traineeBoardIdOfLastViewed: parseInt('1' + THIS_YEAR_CARDINAL_NUM),
  setTraineeBoardIdOfLastViewed: (traineeBoardIdOfLastViewed: number) => {
    set((state) => ({ ...state, traineeBoardIdOfLastViewed: traineeBoardIdOfLastViewed }))
  }
}))