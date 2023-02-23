import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSignInInfoStore } from '../../../stores/localStorageStore/stores'
import { ReportType } from '../../../utils/airtableConfig'
import useUserInfo from '../../../hooks/useUserInfo'
import { UserInfoType } from '../../../utils/types/responseTypes'
import MainContainer from '../../../components/layout/MainContainer'
import { TextField } from '@mui/material'
import { useState } from 'react'

const Report: NextPage = () => {
  const router = useRouter()
  const { userId, oauthId } = useSignInInfoStore()
  const reportTargetId: number = parseInt(router.query.reportTargetId as string)
  const reportTargetType: ReportType = router.query.reportTargetType as ReportType
  const reportTargetTitle: string = router.query.reportTargetTitle as string
  const userInfo = useUserInfo()
  const [content, setContent] = useState<string>('')

  return (
    <MainContainer>
      <main className='py-4 px-5 space-y-4 lg:py-8 lg:space-y-6'>
        <h2 className='text-xl font-semibold text-black lg:text-3xl'>🚨 신고하기</h2>
        <div className='p-2 border border-gray-400 bg-white rounded text-base font-medium text-gray-800 lg:p-3 lg:text-lg'>
          <p>{`<신고 ${reportTargetType}>`}</p>
          <p className='mt-2 p-1 border border-gray-200 rounded text-gray-400 lg:p-2'>{reportTargetTitle}</p>
        </div>
      </main>

      <TextField
        className='w-full'
        multiline
        rows={20}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='신고 사유를 자세히 입력해주세요.'
      />
      {/*<button*/}
      {/*  onClick={submitCSContent}*/}
      {/*  className={'w-full py-4 rounded-lg text-base font-bold lg:mt-20 lg:text-lg'*/}
      {/*    + (content.length > 10 ? ' bg-blue-500 text-gray-50 shadow-button' : ' bg-gray-200 text-gray-400')}*/}
      {/*>*/}
      {/*  전송하기*/}
      {/*</button>*/}
    </MainContainer>
  )
}

export default Report