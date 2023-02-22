import { useQuery } from '@tanstack/react-query'
import { USER_INFO } from '../utils/constants/reactQueryKeyConstants'
import { getUserInfoByUserId } from '../utils/apis/usersApi'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useSnackbarOpenStore } from '../stores/stores'
import { UserInfoType } from '../utils/types/responseTypes'

function useUserInfo(userId: number | null, router: NextRouter): UserInfoType {  //TODO: 구현은 완료됐으나 추후 테스트 필요
  const { data: userInfo, isError } = useQuery(
    [USER_INFO, userId],
    () => { if (userId) getUserInfoByUserId(userId) },
    {
      enabled: !!userId
    }
  )
  const { setMessage, setIsSnackbarOpen } = useSnackbarOpenStore()

  useEffect(() => {
    if (!userId || isError) {
      setMessage('로그인 후 이용해주세요!')
      setIsSnackbarOpen(true)
      router.replace('/auth/signIn')
    }
  }, [userInfo])

  return (userInfo as unknown as UserInfoType)  //TODO : 추후 수정
}

export default useUserInfo