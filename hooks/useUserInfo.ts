import { useQuery } from '@tanstack/react-query'
import { USER_INFO } from '../utils/constants/reactQueryKeyConstants'
import { getUserInfoByUserId } from '../utils/apis/usersApi'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSnackbarOpenStore } from '../stores/stores'
import { UserInfoType } from '../utils/types/responseTypes'
import { useSignInInfoStore } from '../stores/localStorageStore/stores'

function useUserInfo(): UserInfoType | null {
  const router = useRouter()
  const userId = useSignInInfoStore(state => state.userId)
  const { setMessage } = useSnackbarOpenStore()

  const { data: userInfo } = useQuery(
    [USER_INFO, userId],
    () => getUserInfoByUserId(userId ?? 0),
    {
      enabled: !!userId,
      staleTime: 600000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      onError: (error) => {
        setMessage('에러가 발생했습니다. 로그아웃 후 다시 이용해주세요.')
      }
    }
  )

  // 로그인 안한 경우 Redirect
  useEffect(() => {
    if (!userId) {
      setMessage('로그인 후 이용해주세요!')
      router.replace('/auth/signIn')
    }
  }, [userId])

  return userInfo ?? null
}

export default useUserInfo