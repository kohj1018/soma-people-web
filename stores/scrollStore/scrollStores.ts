import { create } from 'zustand'
import {
  BoardTapScrollXState, CommentsWrittenByUserScrollYState,
  InfinitePostsScrollYState,
  MainPageScrollYState,
  PostsWrittenByUserScrollYState,
} from './scrollStoreTypes'

/** 메인 페이지 스크롤 Y값을 저장하는 Store */
export const useMainPageScrollYStore = create<MainPageScrollYState>((set) => ({
  mainPageScrollY: 0,
  setMainPageScrollY: (mainPageScrollY: number) => {
    set((state) => ({ ...state, mainPageScrollY: mainPageScrollY }))
  }
}))

/** 게시글 무한 스크롤 Y값을 저장하는 Store */
export const useInfinitePostsScrollYStore = create<InfinitePostsScrollYState>((set) => ({
  infinitePostsScrollY: 0,
  setInfinitePostsScrollY: (infinitePostsScrollY: number) => {
    set((state) => ({ ...state, infinitePostsScrollY: infinitePostsScrollY }))
  }
}))

/** 작성한 글 페이지 스크롤 Y값을 저장하는 Store */
export const usePostsWrittenByUserScrollYStore = create<PostsWrittenByUserScrollYState>((set) => ({
  postsWrittenByUserScrollY: 0,
  setPostsWrittenByUserScrollY: (postsWrittenByUserScrollY: number) => {
    set((state) => ({ ...state, postsWrittenByUserScrollY: postsWrittenByUserScrollY }))
  }
}))

/** 작성한 댓글 페이지 스크롤 Y값을 저장하는 Store */
export const useCommentsWrittenByUserScrollYStore = create<CommentsWrittenByUserScrollYState>((set) => ({
  commentsWrittenByUserScrollY: 0,
  setCommentsWrittenByUserScrollY: (commentsWrittenByUserScrollY: number) => {
    set((state) => ({ ...state, commentsWrittenByUserScrollY: commentsWrittenByUserScrollY }))
  }
}))

/** 게시판 탭 스크롤 X값을 저장하는 Store */
export const useBoardTapScrollXStore = create<BoardTapScrollXState>((set) => ({
  boardTapScrollX: 0,
  setBoardTapScrollX: (boardTapScrollX: number) => {
    set((state) => ({ ...state, boardTapScrollX: boardTapScrollX }))
  }
}))