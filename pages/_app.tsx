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
import { useIsMobileStore } from '../stores/stores'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
})

type FirebaseTokenInfo = {
  userId: number
  firebaseToken: string | null
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { setFirebaseToken, updatedAt, setUpdatedAt } = useFirebaseTokenStore()
  const { setIsMobile } = useIsMobileStore()

  // Flutter Bridge Function 세팅
  useEffect(() => {
    // @ts-ignore
    window.changePage = (index: number) => {  // 탭 변경 함수
      switch (index) {
        case 0:
          router.push('/')
          break
        case 1:
          router.push('/board')
          break
        default:
          router.push('/profile')
          break
      }
    }

    // @ts-ignore
    window.registerFirebaseToken = (userId: number, firebaseToken: string | null) => {  // firebaseToken 등록함수
      // const firebaseInfo: FirebaseTokenInfo = JSON.parse(firebaseInfoJSON)
      // if (!!firebaseInfo.userId && !!firebaseInfo.firebaseToken) {
      //   const today: string = dayjs().format('YYYY-MM-DD')
        // if (updatedAt === null || (!!updatedAt && dayjs(updatedAt).isAfter(today, 'month'))) { // 등록한 적 없거나, 마지막 수정 날짜보다 한 달 이상 됐을 때 업데이트
      if (firebaseToken) {
        registerFirebaseToken(userId, { firebaseToken: firebaseToken })
          .then(() => {
            setFirebaseToken(firebaseToken)
            // setUpdatedAt(today)
          })
      }
        // }
    }

    // @ts-ignore
    window.checkMobile = (isMobile: boolean) => { // 모바일 여부 확인 함수
      if (isMobile) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
  }, [])
  
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
