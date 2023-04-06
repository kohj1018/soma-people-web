import { useQuery } from '@tanstack/react-query'
import { userKeys } from '../utils/constants/reactQueryKeyConstants'
import { getUserInfoByUserId } from '../utils/apis/usersApi'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSnackbarOpenStore } from '../stores/stores'
import { UserInfoType } from '../utils/types/responseTypes'
import { useSignInInfoStore } from '../stores/localStorageStore/stores'
import { isMobile } from '../utils/functions/isMobile'

function useUserInfo(): UserInfoType | null {
  const router = useRouter()
  const { userId, setUserId, oauthId, setOauthId } = useSignInInfoStore()
  const [returnUserId, setReturnUserId] = useState<number | null>(null) //TODO: hydration 문제 해결위해 추가했는데 문제 생기면 추후 수정
  const { setMessage } = useSnackbarOpenStore()

  const { data: userInfo } = useQuery(  //TODO: 여기 try catch문 한번 손봐야함
    userKeys.detail(returnUserId ?? 0),
    () => {
      try {
        return getUserInfoByUserId(returnUserId ?? 0)
          .catch(() => {
            setUserId(null)
            setOauthId(null)
            window.location.replace('/auth/signIn')
          })
      } catch (err) {
        setUserId(null)
        setOauthId(null)
        window.location.replace('/auth/signIn')
      }
    },
    {
      enabled: !!returnUserId,
      staleTime: 600000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      onError: (err) => {
        setUserId(null)
        setOauthId(null)
        window.location.replace('/auth/signIn')
      }
    }
  )

  // 로그인 안한 경우 Redirect
  useEffect(() => {
    if (!userId || !oauthId) {
      // if (!(router.pathname === '/auth/signUp' )  // TODO : signUp 페이지에서 이 훅이 불러와지는 알 수 없는 버그로 임시 조건문 달아둠. 추후 해결
      //   && !(router.pathname === '/' && !isMobile())) {
      if (router.pathname !== '/auth/signUp') { // TODO : signUp 페이지에서 이 훅이 불러와지는 알 수 없는 버그로 임시 조건문 달아둠. 추후 해결
        setMessage('로그인 후 이용해주세요!')
        router.replace('/auth/signIn')
      }
    } else {
      setReturnUserId(userId)
    }
  }, [userId])

  return userInfo ?? null
}

export default useUserInfo