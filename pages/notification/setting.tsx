import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import SEO from '../../components/SEO'
import MobileCenterTitleHeader from '../../components/layout/mobileHeader/MobileCenterTitleHeader'
import MainArea from '../../components/layout/MainArea'
import { useEffect } from 'react'
import { isWebView } from '../../utils/functions/isWebView'
import Switch from '@mui/material/Switch'
import { useFirebaseTokenStore } from '../../stores/localStorageStore/stores'
import { registerFirebaseToken } from '../../utils/apis/usersApi'
import useUserInfo from '../../hooks/useUserInfo'
import { useSnackbarOpenStore } from '../../stores/stores'

const NotificationSetting: NextPage = () => {
  const userInfo = useUserInfo()
  const { isSubscribed, setIsSubscribed, setFirebaseToken, setUpdatedAt } = useFirebaseTokenStore()
  const { setMessage } = useSnackbarOpenStore()

  // 앱 접속이 아니라면 Redirect
  useEffect(() => {
    if (!isWebView()) window.location.replace('/')
  }, [])

  // 푸시 알림 취소
  const handleUnsubscribing = () => {
    if (!!userInfo) {
      if (isSubscribed) {
        registerFirebaseToken(userInfo.userId, {firebaseToken: ''})
          .then(() => {
            setFirebaseToken(null)
            setUpdatedAt(null)
            setIsSubscribed(false)
            setMessage('알림 수신을 거부하였습니다.')
          })
      } else {
        setIsSubscribed(true)
        setMessage('푸시 알림을 수신합니다. 수신이 안되는 경우 앱 설정에서 소마인 앱 알림이 켜져있는지 확인해주세요.')
      }
    }
  }

  return (
    <MainContainer>
      <SEO title='알림 설정' />

      <MobileCenterTitleHeader title='알림 설정' />

      <MainArea className='px-5'>
        <article className='mt-8 flex items-center justify-between'>
          <p className='text-base font-medium text-gray-900'>푸시 알림 수신</p>
          <Switch
            checked={isSubscribed}
            onChange={() => handleUnsubscribing()}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </article>
      </MainArea>
    </MainContainer>
  )
}

export default NotificationSetting