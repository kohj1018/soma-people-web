import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SignInInfoPersist, SignInInfoState } from './storeTypes'

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