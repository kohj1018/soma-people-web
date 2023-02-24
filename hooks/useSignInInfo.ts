import { useSignInInfoStore } from '../stores/localStorageStore/stores'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSnackbarOpenStore } from '../stores/stores'

function useSignInInfo() {
  const router = useRouter()
  const { userId, oauthId } = useSignInInfoStore()
  const [returnUserId, setReturnUserId] = useState<number | null>(null)
  const [returnOauthId, setReturnOauthId] = useState<string | null>(null)
  const setMessage = useSnackbarOpenStore(state => state.setMessage)

  useEffect(() => {
    if (userId && oauthId) {
      setReturnUserId(userId)
      setReturnOauthId(oauthId)
    } else if (!userId || !oauthId) {   // 로그인 하지 않은 경우 Redirect
      setMessage('로그인 후 이용해주세요!')
      router.replace('/auth/signIn')
    }
  }, [])

  return { userId: returnUserId, oauthId: returnOauthId }
}

export default useSignInInfo