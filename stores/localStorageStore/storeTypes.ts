import { StateCreator } from 'zustand'
import { PersistOptions } from 'zustand/middleware'

export type SignInInfoState = {
  userId: number | null
  setUserId: (userId: number | null) => void
  oauthId: string | null
  setOauthId: (OauthId: string | null) => void
}
export type SignInInfoPersist = (
  config: StateCreator<SignInInfoState>,
  options: PersistOptions<SignInInfoState>
) => StateCreator<SignInInfoState>

export type CertificationRequestState = {
  isAlreadyRequest: boolean
  setIsAlreadyRequest: (isAlreadyRequest: boolean) => void
}
export type CertificationRequestPersist = (
  config: StateCreator<CertificationRequestState>,
  options: PersistOptions<CertificationRequestState>
) => StateCreator<CertificationRequestState>

export type UserHiddenPostIdListState = {
  hiddenPostIdList: number[]
  setHiddenPostIdList: (hiddenPostIdList: number[]) => void
}
export type UserHiddenPostIdListPersist = (
  config: StateCreator<UserHiddenPostIdListState>,
  options: PersistOptions<UserHiddenPostIdListState>
) => StateCreator<UserHiddenPostIdListState>

export type FirebaseTokenState = {
  firebaseToken: string | null
  setFirebaseToken: (firebaseToken: string | null) => void
  updatedAt: string | null
  setUpdatedAt: (updatedAt: string | null) => void
  isSubscribed: boolean
  setIsSubscribed: (isUnsubscribed: boolean) => void
}
export type FirebaseTokenPersist = (
  config: StateCreator<FirebaseTokenState>,
  options: PersistOptions<FirebaseTokenState>
) => StateCreator<FirebaseTokenState>