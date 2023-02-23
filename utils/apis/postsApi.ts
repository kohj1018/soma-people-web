import { MainPagePostListInfoType, PostInfoType } from '../types/responseTypes'
import { ec2 } from './apiConfig'
import { INFINITE_SCROLL_LOAD_SIZE } from '../config'
import { AddPostType } from '../types/addRequestTypes'
import { UpdatePostType } from '../types/updateRequestTypes'

/** 게시글 ID로 게시글 정보 불러오기 */
export const getPostInfoByPostId = async (postId: number): Promise<PostInfoType> => {
  const res = await ec2.get<PostInfoType>(`/posts/${postId}`)
  return res.data
}

/** 게시글 무한 스크롤 불러오기 */
export const getPostInfoListInfinitely = async (boardId: number, lastPostId: number, userId: number) => {
  const res = await ec2.get<PostInfoType[]>(`/posts?boardId=${boardId}&lastPostId=${lastPostId}&size=${INFINITE_SCROLL_LOAD_SIZE}&userId=${userId}`)
  const postList: PostInfoType[] = res.data
  return { postList, nextLastPostId: postList[postList.length - 1]?.postId, isLast: postList.length < INFINITE_SCROLL_LOAD_SIZE }
}

/** 메인 페이지 - 각 게시판 글 5개씩 가져오기 */
export const getPostFromEachBoard = async (userId: number): Promise<MainPagePostListInfoType> => {
  const res = await ec2.get<MainPagePostListInfoType>(`/posts/main?userId=${userId}`)
  return res.data
}

/** 게시글 검색하기 (전체 게시판 검색의 경우 boardIdToSearch 값을 0으로 하기) */
export const searchPostInfoList = async (searchTerm: string, boardIdToSearch: number, userId: number): Promise<PostInfoType[]> => {
  const res = await ec2.get<PostInfoType[]>(`/posts/search?searchTerm=${searchTerm}&boardIdToSearch=${boardIdToSearch}&userId=${userId}`)
  return res.data
}

/** 유저가 작성한 게시글 모두 불러오기 */
export const getPostInfoListByUser = async (userId: string): Promise<PostInfoType[]> => {
  const res = await ec2.get<PostInfoType[]>(`/posts/writtenByUser/${userId}`)
  return res.data
}

/** 새 게시글 등록하기 */
export const addPost = (addPostRequest: AddPostType) => ec2.post('/posts', addPostRequest)

/** 게시글 수정하기 */
export const updatePost = (postId: number, updatePostRequest: UpdatePostType) => ec2.put(`/posts/${postId}`, updatePostRequest)

/** 조회수 1만큼 증가 */
export const increaseView = (postId: number, userId: number) => ec2.put(`/posts/hits/${postId}?userId=${userId}`)