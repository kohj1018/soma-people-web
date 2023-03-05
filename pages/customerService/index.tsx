import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MainContainer from '../../components/layout/MainContainer'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { CsType, postCSContent } from '../../utils/airtableConfig'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useEffect, useState } from 'react'
import useUserInfo from '../../hooks/useUserInfo'
import MainArea from '../../components/layout/MainArea'
import MobileCancelHeader from '../../components/layout/mobileHeader/MobileCancelHeader'
import LoadingCircular from '../../components/layout/LoadingCircular'

const CustomerService: NextPage = () => {
  const router = useRouter()
  const [csType, setCsType] = useState<CsType>('문의')
  const [content, setContent] = useState<string>('')
  const { setMessage } = useSnackbarOpenStore()
  const userInfo = useUserInfo()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [activateButton, setActivateButton] = useState<boolean>(false)
  useEffect(() => { if (content.length > 10) setActivateButton(true); else setActivateButton(false) }, [content]) // 등록 버튼 활성화
  const submitCSContent = () => {
    if (!!userInfo) {
      if (content.length < 11) {
        setMessage('10자 이상 입력해주세요.')
      } else {
        setIsLoading(true)
        postCSContent(csType, userInfo.userId, userInfo.name, content)
          .then(() => {
            setMessage('전송이 완료되었습니다! 감사합니다 😙')
            router.back()
          })
          .catch(() => {
            setMessage('전송에 실패했습니다. 잠시 후 다시 시도해주세요.')
            setIsLoading(false)
          })
      }
    }
  }

  if (isLoading) return <LoadingCircular />

  return (
    <MainContainer>
      <MobileCancelHeader title='문의/건의하기' buttonFunc={submitCSContent} activateButton={activateButton} />

      <MainArea className='px-5 space-y-4 lg:space-y-6'>
        <FormControl className='!mt-8 !w-full'>
          <InputLabel>문의 유형</InputLabel>
          <Select
            value={csType}
            label='문의 유형'
            onChange={(e) => setCsType(e.target.value as CsType)}
          >
            <MenuItem value='문의'>문의</MenuItem>
            <MenuItem value='건의'>건의</MenuItem>
          </Select>
        </FormControl>

        <TextField
          className='w-full'
          multiline
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='문의/건의 내용을 입력해주세요.'
        />
      </MainArea>
    </MainContainer>
  )
}

export default CustomerService