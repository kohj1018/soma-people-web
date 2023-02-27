import { useQuery } from '@tanstack/react-query'
import { userKeys } from '../utils/constants/reactQueryKeyConstants'
import { getUserInfoByUserId } from '../utils/apis/usersApi'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSnackbarOpenStore } from '../stores/stores'
import { UserInfoType } from '../utils/types/responseTypes'
import { useSignInInfoStore } from '../stores/localStorageStore/stores'

function useUserInfo(): UserInfoType | null {
  const router = useRouter()
  const userId = useSignInInfoStore(state => state.userId)
  const [returnUserId, setReturnUserId] = useState<number | null>(null) //TODO: hydration 문제 해결위해 추가했는데 문제 생기면 추후 수정
  const { setMessage } = useSnackbarOpenStore()

  const { data: userInfo } = useQuery(
    userKeys.detail(returnUserId ?? 0),
    () => getUserInfoByUserId(returnUserId ?? 0),
    {
      enabled: !!returnUserId,
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
    } else {
      setReturnUserId(userId)
    }
  }, [userId])

  return userInfo ?? null
}

export default useUserInfo