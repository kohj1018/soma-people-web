import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MainContainer from '../../components/layout/MainContainer'
import MainArea from '../../components/layout/MainArea'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useEffect } from 'react'

const OtherUserProfile: NextPage = () => {
  const router = useRouter()
  const userId = parseInt(router.query.userId as string)
  const { userId: signInId } = useSignInInfoStore()

  // 이용자 ID의 프로필 페이지라면 Redirect
  useEffect(() => {
    if (userId === signInId) {
      router.replace('/profile')
    }
  }, [userId, signInId])

  return (
    <MainContainer>
      <MainArea>

      </MainArea>
    </MainContainer>
  )
}

export default OtherUserProfile