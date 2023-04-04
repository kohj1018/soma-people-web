export const userKeys = {
  all: ['users'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (userId: number) => [...userKeys.details(), { userId }] as const
}

export const boardKeys = {
  all: ['boards'] as const,
  lists: () => [...boardKeys.all, 'list'] as const,
  // list: (boardId: number) => [...boardKeys.lists(), { boardId }] as const
}

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,  // 무한 스크롤
  list: (boardId: number, userId: number) => [...postKeys.lists(), { boardId: boardId, userId: userId }] as const, // 무한 스크롤
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (postId: number) => [...postKeys.details(), postId] as const,
  comments: (postId: number) => [...postKeys.detail(postId), 'commentsList'] as const,
  mainPageSummary: (userId: number) => [...postKeys.all, 'mainPagePostSummary', { userId: userId }] as const,
  postsWrittenByUser: (userId: number) => [...postKeys.all, 'postsWrittenByUser'] as const,
  commentsWrittenByUser: (userId: number) => [...postKeys.details(), 'commentsWrittenByUser']  //TODO: 여기 계층 구조가 좀 이상해서 추후 수정
}

export const blockUserLogKeys = {
  all: ['blockUserLogs'] as const,
  list: (userId: number) => [...blockUserLogKeys.all, 'list', { userId: userId }] as const
}

export const notificationLogKeys = {
  all: ['notificationLogs'] as const,
  list: (userId: number) => [...notificationLogKeys.all, 'list', { userId: userId }] as const
}