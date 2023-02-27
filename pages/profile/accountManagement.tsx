import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import MainArea from '../../components/layout/MainArea'
import MobileBackHeader from '../../components/layout/mobileHeader/MobileBackHeader'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { MuiDialog } from '../../components/common/MuiDialog'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useRouter } from 'next/router'
import { useSnackbarOpenStore } from '../../stores/stores'
import useUserInfo from '../../hooks/useUserInfo'
import { updateUserByOAuthId } from '../../utils/apis/usersApi'

const AccountManagement: NextPage = () => {
  const router = useRouter()
  const { userId, setUserId, oauthId, setOauthId } = useSignInInfoStore()
  const userInfo = useUserInfo()
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState<boolean>(false)
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState<boolean>(false)
  const { setMessage } = useSnackbarOpenStore()

  // 로그아웃 함수
  const signOut = () => {
    setUserId(null)
    setOauthId(null)
    setMessage('로그아웃이 완료되었습니다!')
    router.replace('/')
  }

  // 계정 탈퇴 함수
  const deleteAccount = () => {
    if (!!userId && !!oauthId && !!userInfo) {
      updateUserByOAuthId(oauthId, {
        name: userInfo.name,
        isDelete: true
      })
        .then(() => {
          setMessage('탈퇴가 완료되었습니다. 더 노력하는 소마인이 되겠습니다.')
          router.replace('/')
        })
        .catch(() => {
          setMessage('유저 정보가 존재하지 않습니다! 로그아웃 처리됩니다.')
          signOut()
        })
    } else {
      setMessage('회원 정보 오류! 문제가 반복되면 문의해주세요. 로그아웃 처리됩니다.')
      signOut()
    }
  }

  return (
    <MainContainer>
      <MobileBackHeader title='계정관리'>
      </MobileBackHeader>

      <MainArea className='px-5 py-8'>
        <article className='mt-10 space-y-3'>
          <header className='text-sm font-medium text-[#C1C1C1]'>로그아웃 및 회원탈퇴</header>
          <section className='space-y-6'>
            <button
              onClick={() => setIsSignOutDialogOpen(true)}
              className='w-full flex items-center justify-between'
            >
              <p className='text-base font-medium text-gray-900'>로그아웃</p>
              <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
            </button>
            <button
              onClick={() => setIsDeleteAccountDialogOpen(true)}
              className='w-full flex items-center justify-between'
            >
              <p className='text-base font-medium text-gray-900'>회원탈퇴</p>
              <KeyboardArrowRight className='!w-6 !h-6 text-gray-300' />
            </button>
          </section>
        </article>
      </MainArea>

      {/* 로그아웃 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isSignOutDialogOpen}
        setIsDialogOpen={setIsSignOutDialogOpen}
        dialogTitle='로그아웃'
        dialogContent='로그아웃 하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={signOut}
      />

      {/* 탈퇴 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isDeleteAccountDialogOpen}
        setIsDialogOpen={setIsDeleteAccountDialogOpen}
        dialogTitle='회원 탈퇴'
        dialogContent='탈퇴 후 계정 복구는 불가능합니다. 탈퇴하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={deleteAccount}
      />
    </MainContainer>
  )
}

export default AccountManagement