import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import MainContainer from '../../components/layout/MainContainer'
import React, { Fragment, useState } from 'react'
import { FormControl, MenuItem, Select } from '@mui/material'
import { UserType } from '../../utils/types/userType'
import MuiSelectUserType from '../../components/common/MuiSelectUserType'
import dayjs from 'dayjs'
import { useSnackbarOpenStore } from '../../stores/stores'
import { checkCharacter } from '../../utils/functions/checkCharacter'
import { addUser } from '../../utils/apis/usersApi'
import { AxiosResponse } from 'axios'

const SignUp = () => {
  const router = useRouter()
  const { userId, setUserId, oauthId, setOauthId } = useSignInInfoStore()
  const { data: session } = useSession()
  const [name, setName] = useState<string>('')
  const [userType, setUserType] = useState<UserType | null>(null)
  const [cardinalNumStr, setCardinalNumStr] = useState<string>('')
  const { setMessage } = useSnackbarOpenStore()

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
      try {
        addUser({
          name: name,
          userType: userType,
          cardinalNum: cardinalNumStr.length < 1 ? null : parseInt(cardinalNumStr),
          isCertified: false,
          oauthId: oauthId ?? '',
          refreshToken: session?.refreshToken ?? '',
          agreeTerms: true,
        }).then(async (response: AxiosResponse<number>) => {
          setUserId(response.data)
          setOauthId(oauthId)
          setMessage('가입을 환영합니다🎉')
          router.replace('/')
        })
      } catch (error) {
        setMessage('오류가 발생했습니다. 다시 시도해주세요')
        router.replace('/auth/signIn')
      }
    }
  }


  return (
    <MainContainer>
      <main className='px-5 py-10'>
        <h1 className='text-2xl font-semibold text-gray-900'>기본 정보를<br/>입력해주세요 🤗</h1>

        <section className='mt-10 space-y-5'>
          <article className='w-full flex items-center space-x-4'>
            <p className='text-base font-medium text-gray-900'>이름</p>
            <input
              type='text'
              className='grow px-4 py-2 bg-gray-50 rounded text-base font-medium text-gray-500 placeholder:text-gray-300 focus:outline-none'
              placeholder='실명을 입력해주세요.'
              maxLength={20}
              value={name}
              onChange={(e) => { if (e.target.value.length < e.target.maxLength + 1) setName(e.target.value) }} // 모바일 환경에서는 maxLength 속성이 먹히지 않기 때문에 js 추가
              required
            />
          </article>
          <article className='w-full flex items-center space-x-4'>
            <p className='text-base font-medium text-gray-900'>유형</p>
            <MuiSelectUserType userType={userType} setUserType={setUserType} />
          </article>
          {(userType === '연수생' || userType === '멘토') &&
            <>
              <article className='w-full flex items-center space-x-4'>
                <p className='text-base font-medium text-gray-900'>기수</p>
                <input
                  type='number'
                  className='grow px-4 py-2 bg-gray-50 rounded text-base font-medium text-gray-500 placeholder:text-gray-300 focus:outline-none'
                  placeholder='ex. 13'
                  maxLength={2}
                  value={cardinalNumStr}
                  onChange={(e) => { if (!e.target.value || (parseInt(e.target.value) > 0 && parseInt(e.target.value) < dayjs().year() - 2008)) setCardinalNumStr(e.target.value) }}
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

        {!!name && ((userType === '연수생' && !!cardinalNumStr) || (userType === '멘토' && !!cardinalNumStr) || userType === '준비생' || userType === '사무국') &&
          <button
            onClick={(e) => handleSignUp(e)}
            className='absolute inset-x-5 bottom-10 py-4 rounded bg-slate-900 text-base font-semibold text-white'
          >
            가입하기
          </button>
        }
      </main>
    </MainContainer>
  )
}

export default SignUp