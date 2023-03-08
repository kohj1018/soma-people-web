import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSnackbarOpenStore } from '../../stores/stores'
import { getUserIdByOauthId } from '../../utils/apis/usersApi'
import LoadingCircular from '../../components/layout/LoadingCircular'
import Check from '@mui/icons-material/Check'
import Link from 'next/link'
import { PRIVACY_POLICY, TERMS_OF_USE } from '../../utils/constants/termsAndPolicy'

const TermsAndConditions: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { setUserId, setOauthId } = useSignInInfoStore()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false)
  const [agreePolicy, setAgreePolicy] = useState<boolean>(false)
  const { setMessage } = useSnackbarOpenStore()

  // 기존에 가입한 유저의 경우 로그인 처리 후 Redirect
  useEffect(() => {
    setIsLoading(true)
    if (session?.user.oauthId) {
      ;(async () => {
        const responseUserId: number = await getUserIdByOauthId(session.user.oauthId)
        if (responseUserId > -1) {  // responseUserId이 -1보다 크면 이미 가입한 유저라는 것  (responseUserId = -1 은 해당하는 유저가 없다는 뜻)
          setMessage('다시 만나 반가워요 😀')
          setOauthId(session.user.oauthId)
          setUserId(responseUserId)
          router.replace('/')
        } else {
          setOauthId(session.user.oauthId)
          setIsLoading(false)
        }
      })()
    }
  }, [session])

  if (isLoading) return <LoadingCircular />

  return (
    <div className='relative min-h-screen pt-10 px-5 lg:pt-28'>
      <article className='space-y-1 lg:mt-8 lg:space-y-2'>
        <h2 className='text-xl font-semibold text-black lg:text-3xl'>약관동의</h2>
        <h3 className='text-sm font-semibold text-gray-400 lg:text-lg'>소마인 서비스 이용을 위해 약관 동의가 필요합니다.</h3>
      </article>

      <section className='mt-8 space-y-6 lg:mt-12 lg:space-y-9'>
        <article className='space-y-3.5 lg:space-y-5'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold text-gray-900 lg:text-lg'><span className='text-blue-700'>(필수) </span>소마인서비스이용약관</p>
            <button
              onClick={() => setAgreeTerms(!agreeTerms)}
              className={'w-5 h-5 flex items-center justify-center rounded-full border-2 lg:w-8 lg:h-8'
                + (agreeTerms ? ' bg-gray-600 border-gray-600' : ' bg-gray-200 border-gray-200')}
            >
              <Check className='!w-3 !h-3 text-white lg:w-4 lg:h-4' />
            </button>
          </div>
          <div className='h-32 p-4 text-xs font-medium text-gray-500 bg-gray-100 overflow-auto lg:text-sm'>
            {TERMS_OF_USE}
          </div>
        </article>

        <article className='space-y-3.5 lg:space-y-5'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold text-gray-900 lg:text-lg'><span className='text-blue-700'>(필수) </span>개인정보처리방침</p>
            <button
              onClick={() => setAgreePolicy(!agreePolicy)}
              className={'w-5 h-5 flex items-center justify-center rounded-full border-2 lg:w-8 lg:h-8'
                + (agreePolicy ? ' bg-gray-600 border-gray-600' : ' bg-gray-200 border-gray-200')}
            >
              <Check className='!w-3 !h-3 text-white lg:w-4 lg:h-4' />
            </button>
          </div>
          <div className='h-32 p-4 text-xs font-medium text-gray-500 bg-gray-100 overflow-auto lg:text-sm'>
            {PRIVACY_POLICY}
          </div>
        </article>
      </section>

      {/* 다음 버튼 */}
      {agreeTerms && agreePolicy &&
        <Link
          href='/auth/signUp'
          className='absolute inset-x-5 bottom-10 py-4 rounded bg-slate-900 shadow-button text-center text-base font-bold text-gray-50 lg:moveToXAxisCenter lg:w-[50rem]'
        >
          다음
        </Link>
      }
    </div>
  )
}

export default TermsAndConditions