import { usePostsWrittenByUserScrollYStore } from './scrollStores'

export type MainPageScrollYState = {
  mainPageScrollY: number
  setMainPageScrollY: (mainPageScrollY: number) => void
}

export type InfinitePostsScrollYState = {
  infinitePostsScrollY: number
  setInfinitePostsScrollY: (infinitePostsScrollY: number) => void
}

export type PostsWrittenByUserScrollYState = {
  postsWrittenByUserScrollY: number
  setPostsWrittenByUserScrollY: (postsWrittenByUserScrollY: number) => void
}

export type CommentsWrittenByUserScrollYState = {
  commentsWrittenByUserScrollY: number
  setCommentsWrittenByUserScrollY: (commentsWrittenByUserScrollY: number) => void
}

export type BoardTapScrollXState = {
  boardTapScrollX: number
  setBoardTapScrollX: (boardTapScrollX: number) => void
}