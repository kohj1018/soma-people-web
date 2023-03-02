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