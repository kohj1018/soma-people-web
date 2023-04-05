import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/layout/Layout";
import { SessionProvider } from 'next-auth/react'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { registerFirebaseToken } from '../utils/apis/usersApi'
import { useFirebaseTokenStore } from '../stores/localStorageStore/stores'
import dayjs from 'dayjs'
import { useAppVersionStore } from '../stores/stores'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { setFirebaseToken, updatedAt, setUpdatedAt, isSubscribed } = useFirebaseTokenStore()
  const { appVersion, setAppVersion } = useAppVersionStore()

  // Flutter Bridge Function 세팅
  useEffect(() => {
    // @ts-ignore
    window.registerFirebaseToken = (userId: number, firebaseToken: string | null) => {  // firebaseToken 등록함수
      if (isSubscribed) { // 푸시 알림 수신한 경우만 토큰 등록
        if (!!userId && !!firebaseToken) {
          const today: string = dayjs().format('YYYY-MM-DD')
          if (updatedAt === null || dayjs(updatedAt).isBefore(today, 'month')) { // 등록한 적 없거나, 마지막 수정 날짜보다 한 달 이상 됐을 때 업데이트
            registerFirebaseToken(userId, { firebaseToken: firebaseToken })
              .then(() => {
                setFirebaseToken(firebaseToken)
                setUpdatedAt(today)
              })
          }
        }
      }
    }

    // @ts-ignore
    window.getAppVersion = (appVersion: string) => {
      setAppVersion(appVersion)
    }
  }, [])

  // Flutter Bridge Function - 탭 이동 함수 세팅
  useEffect(() => {
    // @ts-ignore
    window.changePage = (index: number) => {  // 탭 변경 함수
      if (appVersion === '1.0.0') {
        switch (index) {
          case 0:
            router.push('/')
            break
          case 1:
            router.push('/board')
            break
          case 2:
            router.push('/notification')
            break
          case 3:
            router.push('/profile')
            break
          default:
            router.push('/')
            break
        }
      } else {
        switch (index) {
          case 0:
            router.push('/')
            break
          case 1:
            router.push('/board')
            break
          case 2:
            router.push('/profile')
            break
          default:
            router.push('/')
            break
        }
      }
    }
  }, [appVersion])
  
  return (
    <>
      <GoogleAnalytics />

      {/* App */}
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </QueryClientProvider>
    </>
  )
}
