import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import React, { useEffect, useState } from 'react'
import LoadingCircular from '../../components/layout/LoadingCircular'
import { useIsFirstLoadStore, useSnackbarOpenStore } from '../../stores/stores'
import { useRouter } from 'next/router'
import Image from 'next/image'
import signInBackGround from '../../public/signInBackGround.svg'
import mainLogo from '../../public/mainLogo.svg'
import googleLogo from '../../public/icon/signInIcon/googleLogo.svg'
import appleLogo from '../../public/icon/signInIcon/appleLogo.svg'
import SEO from '../../components/SEO'
import Head from 'next/head'
import { afterLoadingIsComplete } from '../../utils/functions/flutterBridgeFunc/afterLoadingIsComplete'
import { isMobile } from '../../utils/functions/isMobile'

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}

const SignIn: NextPage<Props> = ({ providers }: Props) => {
  const router = useRouter()
  const { userId, oauthId } = useSignInInfoStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isFirstLoad, setIsFirstLoad } = useIsFirstLoadStore()
  const { setMessage } = useSnackbarOpenStore()

  useEffect(() => {
    if (!!userId && !!oauthId) {
      setMessage('이미 로그인 되어 있습니다.')
      router.replace('/')
    }
  }, [userId, oauthId])

  useEffect(() => {
    if (isMobile() && isFirstLoad) {
      afterLoadingIsComplete(-1, navigator.userAgent)
      setIsFirstLoad(false)
    }
  }, [])

  const goToSignIn = (providerId: LiteralUnion<BuiltInProviderType, string>) => {
    setIsLoading(true)
    signIn(providerId, { callbackUrl: process.env.SIGNIN_CALLBACK_URL })
  }

  if (isLoading) return <LoadingCircular />

  return (
    <div className='w-full h-screen relative overflow-hidden'>
      <SEO title='소마인 로그인' />

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </Head>

      <Image
        src={signInBackGround}
        className='w-full h-auto'
        alt='로그인 배경화면'
      />
      <Image
        src={mainLogo}
        className='moveToCenter'
        alt='소마인 로고'
      />

      <section className='absolute top-3/4 moveToXAxisCenter w-3/4 flex flex-col items-center space-y-5'>
        {providers &&
          Object.values(providers).map((provider) => {
            switch (provider.name) {
              case 'Google':
                return (
                  <button
                    key={provider.name}
                    className='w-full h-10 px-10 flex items-center justify-center space-x-2 rounded bg-white'
                    onClick={() => goToSignIn(provider.id)}
                  >
                    <Image src={googleLogo} className='w-[1.125rem] h-[1.125rem]' alt='구글 로고' />
                    <p className='font-roboto text-sm font-medium text-black'>Google 계정으로 로그인</p>
                  </button>
                )
              case 'Apple':
                return (
                  <button
                    key={provider.name}
                    className='w-full h-10 px-10 flex items-center justify-center rounded bg-white'
                    onClick={() => goToSignIn(provider.id)}
                  >
                    <Image src={appleLogo} className='w-10 h-10' alt='애플 로고' />
                    <p className='font-roboto text-sm font-medium text-black'>Apple로 로그인</p>
                  </button>
                )
              default:
                return (
                  <p>에러</p>
                )
            }
          })
        }
      </section>
    </div>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext) => {
  const providers = await getProviders()
  return {
    props: {
      providers
    }
  }
}