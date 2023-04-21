import Image from 'next/image'
import mainLogo from '../../public/mainLogo.svg'
import Link from 'next/link'
import VerifiedUser from '@mui/icons-material/VerifiedUser'
import useUserInfo from '../../hooks/useUserInfo'
import { useEffect, useState } from 'react'
import { UserInfoType } from '../../utils/types/responseTypes'
import { useSnackbarOpenStore } from '../../stores/stores'
import { getUserInfoByUserId, handlingUserCertification } from '../../utils/apis/usersApi'
import useSignInInfo from '../../hooks/useSignInInfo'
import { CircularProgress } from '@mui/material'

const Admin = () => {
  const userInfo = useUserInfo()
  const { oauthId: adminOauthId } = useSignInInfo()
  const [targetUserId, setTargetUserId] = useState<number>()
  const [targetUserInfo, setTargetUserInfo] = useState<UserInfoType | null>(null)
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false)
  const [isCertificationLoading, setIsCertificationLoading] = useState<boolean>(false)
  const { setMessage } = useSnackbarOpenStore()

  // 관리자 아닌 경우 Redirect
  useEffect(() => {
    if (!!userInfo) {
      if (userInfo.userType !== '관리자' || !userInfo.isCertified) {
        window.location.replace('/')
      }
    }
  }, [userInfo])

  // 유저 아이디로 TargetUserInfo 조회하기
  const getTargetUserInfo = (userId: number | undefined) => {
    setIsSearchLoading(true)
    if (userId) {
      getUserInfoByUserId(userId)
        .then((response) => {
          setTargetUserInfo(response)
          setMessage('유저 정보를 조회하였습니다.')
        })
        .catch(() => {
          setMessage('존재하지 않는 유저입니다. 정확히 입력해주세요.')
        })
        .finally(() => setIsSearchLoading(false))
    } else {
      setMessage('조회하려는 유저의 아이디를 입력해주세요.')
      setIsSearchLoading(false)
    }
  }

  // 소마인 인증 처리하기
  const handleCertification = (adminOauthId: string | null, targetUserId: number | undefined) => {
    if (adminOauthId && targetUserId) {
      setIsCertificationLoading(true)
      handlingUserCertification({
        adminOauthId: adminOauthId,
        targetUserId: targetUserId
      }).then(() => {
        setMessage('인증 처리가 완료되었습니다!')
        setTargetUserId(undefined)
        setTargetUserInfo(null)
      })
        .catch(() => {
          setMessage('인증 처리를 실패했습니다. 다시 시도해주세요.')
        })
        .finally(() => setIsCertificationLoading(false))
    }
  }

  return (
    <div className='relative min-h-screen'>
      <header className='fixed top-0 inset-x-0 h-14 px-10 flex items-center justify-between bg-zinc-900 z-50'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/'
            className='w-[8.5rem]'
          >
            <Image
              src={mainLogo}
              className='w-[8.5rem] h-8'
              alt='소마인 로고'
              priority
            />
          </Link>
          <h1 className='text-2xl font-semibold text-white'>관리 페이지</h1>
        </div>
      </header>

      <aside className='w-72 fixed top-14 left-0 bg-gray-100' style={{ height: 'calc(100vh - 56px)'}}>
        <Link
          href='/admin'
          className='w-full px-6 py-4 flex items-center space-x-4 border-b border-b-gray-200'
        >
          <VerifiedUser className='!w-6 !h-6 text-blue-500' />
          <p className='text-lg font-medium text-gray-900'>회원 인증 관리</p>
        </Link>
      </aside>

      <main className='relative top-14 left-72 p-8' style={{ width: 'calc(100vw - 18rem)', minHeight: 'calc(100vh - 56px)' }}>
        <h2 className='text-xl font-semibold text-gray-900'>회원 정보 조회</h2>
        <div className='mt-4 flex items-center space-x-4'>
          <input
            type='number'
            className='w-72 px-4 py-2 bg-gray-50 rounded border border-gray-100 text-base font-medium text-gray-500 placeholder:text-gray-300 focus:outline-none'
            placeholder='유저 아이디를 입력해주세요'
            value={targetUserId}
            onChange={(e) => setTargetUserId(parseInt(e.target.value))}
            required
          />
          <button
            onClick={() => getTargetUserInfo(targetUserId)}
            className='px-4 py-2 bg-blue-500 rounded text-base font-medium text-white'
          >
            조회
          </button>
        </div>
        {(!!targetUserInfo || isSearchLoading) &&
          <>
            <h2 className='mt-6 text-xl font-semibold text-gray-900'>조회 결과</h2>
            <div className='mt-4 w-72 p-4 grid grid-cols-2 gap-y-2 rounded-lg border border-gray-200 bg-gray-100 shadow-commentCard text-base font-medium text-gray-900'>
              {!isSearchLoading ? (
                <>
                  <p className='font-bold'>아이디</p>
                  <p>{targetUserInfo?.userId}</p>
                  <p className='font-bold'>이름</p>
                  <p>{targetUserInfo?.name}</p>
                  <p className='font-bold'>유형</p>
                  <p>{targetUserInfo?.userType}</p>
                  <p className='font-bold'>기수</p>
                  <p>{targetUserInfo?.cardinalNum}</p>
                  <p className='font-bold'>인증 여부</p>
                  <p className={targetUserInfo?.isCertified ? 'text-blue-500' : 'text-red-500'}>{targetUserInfo?.isCertified ? 'YES' : 'NO'}</p>
                </>
              ) : (
                <CircularProgress />
              )}
            </div>
            {!!targetUserInfo && !targetUserInfo.isCertified &&
              <button
                onClick={() => handleCertification(adminOauthId, targetUserId)}
                className='mt-4 px-4 py-2 rounded-xl bg-emerald-500'
              >
                {!isCertificationLoading ? (
                  <p className='text-lg font-medium text-white'>소마인 인증 처리하기</p>
                ) : (
                  <CircularProgress />
                )}
              </button>
            }
          </>
        }
      </main>
    </div>
  )
}

export default Admin