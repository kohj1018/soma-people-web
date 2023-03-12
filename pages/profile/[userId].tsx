import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MainContainer from '../../components/layout/MainContainer'
import MainArea from '../../components/layout/MainArea'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useEffect, useState } from 'react'
import MobileBackHeader from '../../components/layout/mobileHeader/MobileBackHeader'
import { MenuItem } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { blockUserLogKeys, userKeys } from '../../utils/constants/reactQueryKeyConstants'
import { getUserInfoByUserId } from '../../utils/apis/usersApi'
import { useSnackbarOpenStore } from '../../stores/stores'
import isMakingIcon from '../../public/icon/isMakingIcon.svg'
import Image from 'next/image'
import UserTypeTag from '../../components/tag/UserTypeTag'
import VerifiedUser from '@mui/icons-material/VerifiedUser'
import { addBlockUserLog, deleteBlockUserLog, getAllBlockUserInfo } from '../../utils/apis/blockUserLogsApi'
import SEO from '../../components/SEO'

const OtherUserProfile: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const otherUserId = parseInt(router.query.userId as string)
  const { userId } = useSignInInfoStore()
  const { data: otherUserInfo } = useQuery(
    userKeys.detail(otherUserId),
    () => getUserInfoByUserId(otherUserId),
    {
      enabled: !!otherUserId,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false
    }
  )
  const { data: blockUserInfoList } = useQuery(
    blockUserLogKeys.list(userId ?? 0),
    () => getAllBlockUserInfo(userId ?? 0),
    {
      enabled: !!userId
    }
  )
  const [isBlock, setIsBlock] = useState<boolean>(false)
  const { setMessage } = useSnackbarOpenStore()

  // 이용자 ID의 프로필 페이지라면 Redirect
  useEffect(() => {
    if (otherUserId === userId) {
      router.replace('/profile')
    }
  }, [otherUserId, userId])

  // 차단한 유저인지 확인
  useEffect(() => {
    if (!!blockUserInfoList?.find((userInfo) => userInfo.userId === otherUserId)) {
      setIsBlock(true)
    } else {
      setIsBlock(false)
    }
  }, [blockUserInfoList])


  // 유저 차단/차단해제 함수
  const blockOrUnblockUser = () => {
    if (!!userId && !!otherUserId) {
      if (!isBlock) {
        addBlockUserLog({
          userId: userId,
          blockUserId: otherUserId
        }).then(() => {
          queryClient.invalidateQueries(blockUserLogKeys.all)
          setMessage('차단하었습니다.')
        }).catch(() => {
          setMessage('오류가 발생했습니다.')
        })
      } else {
        deleteBlockUserLog(userId, otherUserId)
          .then(() => {
            queryClient.invalidateQueries(blockUserLogKeys.all)
            setMessage('차단이 해제되었습니다.')
          })
          .catch(() => {
            setMessage('오류가 발생했습니다.')
          })
      }
    } else {
      setMessage('로그인 되어있지 않습니다.')
      router.push('/auth/signIn')
    }
  }

  return (
    <MainContainer>
      <SEO title={`${otherUserInfo?.name} : 유저 정보 조회`} />
      
      <MobileBackHeader title={isBlock ? '(차단한 유저)' : ''}>
        <MenuItem
          onClick={() => router.push({
            pathname: '/customerService/report',
            query: {
              reportTargetId: otherUserId,
              reportTargetType: '유저',
              reportTargetTitle: otherUserInfo?.name
            }
          })}
        >
          신고하기
        </MenuItem>
        <MenuItem onClick={blockOrUnblockUser}>
          {isBlock ? '차단 해제하기' : '차단하기'}
        </MenuItem>
      </MobileBackHeader>

      <MainArea className='min-h-screen flex flex-col'>
        <article className='w-full px-5 py-8 flex items-center justify-between bg-white'>
          <div className='flex items-center space-x-2'>
            <p className='text-xl font-semibold text-gray-900'>{otherUserInfo?.name}</p>
            {!!otherUserInfo &&
              <UserTypeTag userType={otherUserInfo.userType} cardinalNum={otherUserInfo.cardinalNum} isAnonymous={false} />
            }
          </div>
          <div className={'flex items-center space-x-1' + (otherUserInfo?.isCertified ? ' text-blue-500' : ' text-gray-300')}>
            <VerifiedUser className='!w-[1.125rem] !h-[1.125rem]' />
            <p className='text-sm font-semibold'>{otherUserInfo?.isCertified ? '소마인 인증 완료' : '소마인 미인증'}</p>
          </div>
        </article>
        <div className='relative grow bg-gray-50'>
          <article className='moveToCenter flex flex-col items-center space-y-5'>
            <Image
              src={isMakingIcon}
              className='w-15 h-15'
              alt='만들고 있는 중 아이콘'
            />
            <p className='text-base font-semibold text-gray-400'>아직 준비 중이에요</p>
          </article>
        </div>
      </MainArea>
    </MainContainer>
  )
}

export default OtherUserProfile