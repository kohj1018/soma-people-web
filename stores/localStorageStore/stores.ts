import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  CertificationRequestPersist,
  CertificationRequestState,
  SignInInfoPersist,
  SignInInfoState, UserHiddenPostIdListPersist, UserHiddenPostIdListState,
} from './storeTypes'

/** 유저 아이디와 OAuth에서 받은 id를 저장하는 Store */
export const useSignInInfoStore = create<SignInInfoState>(
  (persist as SignInInfoPersist)(
    (set) => ({
      userId: null,
      setUserId: (userId: number | null) => {
        set((state) => ({...state, userId: userId}))
      },
      oauthId: null,
      setOauthId: (oauthId: string | null) => {
        set((state) => ({...state, oauthId: oauthId}))
      }
    }),
    {
      name: 'signInInfo'
    }
  )
)

/** 소마인 인증 신청 여부를 저장하는 Store */
export const useCertificationRequestStore = create<CertificationRequestState>(
  (persist as CertificationRequestPersist)(
    (set) => ({
      isAlreadyRequest: false,
      setIsAlreadyRequest: (isAlreadyRequest: boolean) => {
        set((state) => ({...state, isAlreadyRequest: isAlreadyRequest}))
      }
    }),
    {
      name: 'certificationRequest'
    }
  )
)

/** 유저가 숨기기한 게시글 Id를 저장하는 Store */
export const useUserHiddenPostIdListStore = create<UserHiddenPostIdListState>(
  (persist as UserHiddenPostIdListPersist)(
    (set) => ({
      hiddenPostIdList: [],
      setHiddenPostIdList: (hiddenPostIdList: number[]) => {
        set((state) => ({...state, hiddenPostIdList: hiddenPostIdList}))
      }
    }),
    {
      name: 'hiddenPostIdList'
    }
  )
)