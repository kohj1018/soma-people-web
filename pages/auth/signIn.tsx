import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useEffect, useState } from 'react'
import LoadingCircular from '../../components/layout/LoadingCircular'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useRouter } from 'next/router'

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}

const SignIn: NextPage<Props> = ({ providers }: Props) => {
  const router = useRouter()
  const { userId, oauthId } = useSignInInfoStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setMessage } = useSnackbarOpenStore()

  useEffect(() => {
    if (!!userId && !!oauthId) {
      setMessage('이미 로그인 되어 있습니다.')
      router.replace('/')
    }
  }, [userId, oauthId])

  const goToSignIn = (providerId: LiteralUnion<BuiltInProviderType, string>) => {
    setIsLoading(true)
    signIn(providerId, { callbackUrl: process.env.SIGNIN_CALLBACK_URL })
  }

  if (isLoading) return <LoadingCircular />

  return (
    <div>
      {providers &&
        Object.values(providers).map((provider) => {
          switch (provider.name) {
            case 'Google':
              return (
                <button
                  key={provider.name}
                  className='pl-2 pr-4 py-3 flex items-center justify-between space-x-6 rounded border border-blue-500'
                  onClick={() => goToSignIn(provider.id)}
                >
                  <p className='font-roboto text-base font-medium text-blue-500 lg:text-[1.4375rem]'>구글 계정으로 로그인하기</p>
                </button>
              )
            case 'Apple':
              return (
                <button
                  key={provider.name}
                  className='pl-2 pr-4 py-3 flex items-center justify-between space-x-6 rounded border border-blue-500'
                  onClick={() => goToSignIn(provider.id)}
                >
                  <p className='font-roboto text-base font-medium text-blue-500 lg:text-[1.4375rem]'>애플 계정으로 로그인하기</p>
                </button>
              )
            default:
              return (
                <p>에러</p>
              )
          }
        })
      }
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