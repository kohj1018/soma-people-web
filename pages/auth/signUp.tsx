import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import MainContainer from '../../components/layout/MainContainer'
import React, { Fragment, useEffect, useState } from 'react'
import { UserType } from '../../utils/types/userType'
import MuiSelectUserType from '../../components/common/MuiSelectUserType'
import { useBoardIdOfLastViewedStore, useSnackbarOpenStore } from '../../stores/stores'
import { checkCharacter } from '../../utils/functions/checkCharacter'
import { addUser } from '../../utils/apis/usersApi'
import { AxiosResponse } from 'axios'
import { PREP_STUDENT_CARDINAL_NUM, THIS_YEAR_CARDINAL_NUM } from '../../utils/config'
import { useMutation } from '@tanstack/react-query'
import { AddUserType } from '../../utils/types/addRequestTypes'
import SEO from '../../components/SEO'

const SignUp = () => {
  const router = useRouter()
  const { userId, setUserId, oauthId, setOauthId } = useSignInInfoStore()
  const { data: session } = useSession()
  const [name, setName] = useState<string>('')
  const [userType, setUserType] = useState<UserType | null>(null)
  const [cardinalNumStr, setCardinalNumStr] = useState<string>('')
  const { setBoardIdOfLastViewed } = useBoardIdOfLastViewedStore()
  const { setMessage } = useSnackbarOpenStore()

  const { mutate: addUserMutate, isSuccess } = useMutation(async () => {
    try {
      if (userType && oauthId) {
        addUser({
          name: name,
          userType: userType,
          cardinalNum: cardinalNumStr.length < 1 ? (userType === '준비생' ? PREP_STUDENT_CARDINAL_NUM : 0) : parseInt(cardinalNumStr),
          email: session?.user.email ?? '',
          oauthId: oauthId,
          refreshToken: session?.refreshToken ?? '',
          agreeTerms: true,
        }).then((response: AxiosResponse<number>) => {
          setUserId(response.data)
          setOauthId(oauthId)
          setBoardIdOfLastViewed(4) // 미인증 이용자는 준비생 게시판만 이용 가능
          setMessage('가입을 환영합니다🎉')
          router.replace('/')
        })
      } else {
        throw new Error('가입 필수 정보 미기입!')
      }
    } catch (error) {
      setMessage('오류가 발생했습니다. 다시 시도해주세요')
      setUserId(null)
      setOauthId(null)
      router.replace('/auth/signIn')
    }
  })

  // // 자동 이름 입력 (앱스토어 요청 사항)
  // useEffect(() => {
  //   if (session?.user) {
  //     setName(session.user.name ?? '')
  //   }
  // }, [session])

  // 이름 입력 제한 함수
  const nameInputRestriction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < e.target.maxLength + 1) {
      if (!(/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g).test(e.target.value)) {  // 한글만 입력되게 제한
      // if (!(/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi).test(e.target.value)) {  // 특수문자 제한
        setName(e.target.value)
      }
    }
  }

  // 유저 가입 함수
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // 오류 처리
    if (!oauthId) {
      setMessage('oauthId 오류. 다시 시도해주세요.')
      router.replace('/auth/signIn')
    }

    // 이미 가입한 유저 Redirect
    if (!!userId && !!oauthId) {
      setMessage('이미 가입 되어 있습니다.')
      router.replace('/')
    }

    // 특수문자, 공백, 빈 문자열 체크
    if (checkCharacter(name, false, setMessage)
      && ((userType === '연수생' && checkCharacter(cardinalNumStr, false, setMessage))
        || (userType === '멘토' && checkCharacter(cardinalNumStr, false, setMessage))
        || userType === '준비생' || userType === '사무국')
    ) {
      if (name.includes('관리자') || name.includes('운영자')) {
        setMessage('해당 이름은 사용할 수 없습니다.')
      } else {
        addUserMutate() // 가입 로직 실행
      }
    }
  }


  return (
    <MainContainer>
      <SEO title='소마인 회원가입' />

      <main className='w-screen h-screen px-5 py-10 flex flex-col justify-between'>
        <div className='space-y-5'>
          <h1 className='text-2xl font-semibold text-gray-900'>기본 정보를<br/>입력해 주세요 🤗</h1>

          <section className='space-y-5'>
            <div>
              <article className='w-full flex items-center justify-between space-x-4'>
                {/*<p className='w-[2.625rem] text-base font-medium text-gray-900 whitespace-nowrap'>닉네임</p>*/}
                <p className='text-base font-medium text-gray-900 whitespace-nowrap'>이름</p>
                <input
                  type='text'
                  className='w-full px-4 py-2 bg-gray-50 rounded text-base font-medium text-gray-500 placeholder:text-gray-300 focus:outline-none'
                  // placeholder='사용할 닉네임을 입력해주세요.'
                  placeholder='실명을 입력해주세요.'
                  maxLength={20}
                  value={name}
                  onChange={(e) => nameInputRestriction(e)} // 모바일 환경에서는 maxLength 속성이 먹히지 않기 때문에 js 추가
                  required
                />
              </article>
              {/*{session?.user.name && userType === null &&*/}
              {/*  <p className='mt-1 text-right text-sm font-medium text-blue-900'>실명을 입력해주세요.</p>*/}
              {/*}*/}
            </div>
            <article className='w-full flex items-center justify-between space-x-4'>
              {/*<p className='w-[2.625rem] text-base font-medium text-gray-900'>유형</p>*/}
              <p className='text-base font-medium text-gray-900'>유형</p>
              <MuiSelectUserType userType={userType} setUserType={setUserType} />
            </article>
            {(userType === '연수생' || userType === '멘토') &&
              <>
                <article className='w-full flex items-center justify-between space-x-4'>
                  {/*<p className='w-[2.625rem] text-base font-medium text-gray-900 whitespace-nowrap'>기수</p>*/}
                  <p className='text-base font-medium text-gray-900 whitespace-nowrap'>기수</p>
                  <input
                    type='number'
                    className='w-full px-4 py-2 bg-gray-50 rounded text-base font-medium text-gray-500 placeholder:text-gray-300 focus:outline-none'
                    placeholder='ex. 13'
                    maxLength={2}
                    value={cardinalNumStr}
                    onChange={(e) => { if (!e.target.value || (parseInt(e.target.value) > 0 && parseInt(e.target.value) < THIS_YEAR_CARDINAL_NUM + 1)) setCardinalNumStr(e.target.value) }}
                    required
                  />
                </article>
                <Fragment>
                  {userType === '멘토' &&
                    <div className='px-5 py-2 bg-blue-50 rounded-[2rem]'>
                      <p className='text-sm font-medium text-blue-900'>✅ 처음 멘토를 시작한 기수를 적어주세요</p>
                    </div>
                  }
                </Fragment>
              </>
            }
          </section>
        </div>

        {!!name && ((userType === '연수생' && !!cardinalNumStr) || (userType === '멘토' && !!cardinalNumStr) || userType === '준비생' || userType === '사무국') &&
          <button
            onClick={(e) => handleSignUp(e)}
            className={'w-full py-4 rounded text-base font-semibold text-white' + (isSuccess ? ' bg-gray-300' : ' bg-slate-900')}
            disabled={isSuccess}  // 여러번 가입 안되도록 누르면 비활성화
          >
            가입하기
          </button>
        }
      </main>
    </MainContainer>
  )
}

export default SignUp