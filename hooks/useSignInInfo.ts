import { useSignInInfoStore } from '../stores/localStorageStore/stores'
import { useEffect, useState } from 'react'

function useSignInInfo() {
  const { userId, oauthId } = useSignInInfoStore()
  const [returnUserId, setReturnUserId] = useState<number | null>(null)
  const [returnOauthId, setReturnOauthId] = useState<string | null>(null)

  useEffect(() => {
    setReturnUserId(userId)
    setReturnOauthId(oauthId)
  }, [])

  return { userId: returnUserId, oauthId: returnOauthId }
}

export default useSignInInfo