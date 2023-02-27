import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { postCSContent, ReportType } from '../../../utils/airtableConfig'
import useUserInfo from '../../../hooks/useUserInfo'
import MainContainer from '../../../components/layout/MainContainer'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import MainArea from '../../../components/layout/MainArea'
import MobileCancelHeader from '../../../components/layout/mobileHeader/MobileCancelHeader'
import { useSnackbarOpenStore } from '../../../stores/stores'
import LoadingCircular from '../../../components/layout/LoadingCircular'

const Report: NextPage = () => {
  const router = useRouter()
  const reportTargetId: number = parseInt(router.query.reportTargetId as string)
  const reportTargetType: ReportType = router.query.reportTargetType as ReportType
  const reportTargetTitle: string = router.query.reportTargetTitle as string
  const userInfo = useUserInfo()
  const [content, setContent] = useState<string>('')
  const { setMessage } = useSnackbarOpenStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const submitCSContent = () => {
    if (!!userInfo) {
      if (content.length > 10) {
        setIsLoading(true)
        postCSContent('신고', userInfo.userId, userInfo.name, content, reportTargetType, reportTargetId)
          .then(() => {
            setMessage('전송이 완료되었습니다! 감사합니다 😙')
            router.back()
          })
          .catch(() => {
            setMessage('오류가 발생했습니다. 다시 시도해주세요.')
          })
      } else {
        setMessage('10자 이상 입력해주세요.')
      }
    }
  }

  if (isLoading) return <LoadingCircular />

  return (
    <MainContainer>
      <MobileCancelHeader title='신고하기' buttonFunc={submitCSContent} />
      
      <MainArea className='px-5 space-y-4 lg:py-8 lg:space-y-6'>
        <h2 className='mt-4 text-xl font-semibold text-black lg:text-3xl'>🚨 신고하기</h2>
        <div className='p-2 border border-gray-400 bg-white rounded text-base font-medium text-gray-800 lg:p-3 lg:text-lg'>
          <p>{`<신고 ${reportTargetType}>`}</p>
          <p className='mt-2 p-1 border border-gray-200 rounded text-gray-400 lg:p-2'>{reportTargetTitle}</p>
        </div>

        <TextField
          className='w-full'
          multiline
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='신고 사유를 자세히 입력해주세요.'
        />
      </MainArea>
    </MainContainer>
  )
}

export default Report