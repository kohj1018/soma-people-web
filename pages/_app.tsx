import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/layout/Layout";
import { SessionProvider } from 'next-auth/react'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Flutter Bridge Function 세팅
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.changePage = (index: number) => {
      switch (index) {
        case 0:
          router.push('/')
          break
        case 1:
          router.push('/board')
          break
        default:
          router.push('/user')
          break
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
