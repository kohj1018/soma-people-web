import { useQuery } from '@tanstack/react-query'
import { USER_INFO } from '../utils/constants/reactQueryKeyConstants'
import { getUserInfoByUserId } from '../utils/apis/usersApi'

function useUserInfo(userId: number) {  //TODO: 구현 중
  const { data: userInfo, isLoading } = useQuery(
    [USER_INFO, userId],
    () => getUserInfoByUserId(userId),
    {
      enabled: !!userId
    }
  )


}

export default useUserInfo