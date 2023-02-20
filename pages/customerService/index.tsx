import { useRouter } from 'next/router'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import MainContainer from '../../components/layout/MainContainer'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { CsType } from '../../utils/airtableConfig'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useState } from 'react'

//TODO: 나중에 디자인 완성되면 퍼블리싱 수정해야 함

const CustomerService = () => {
  const router = useRouter()
  const { userId, oauthId } = useSignInInfoStore()
  const [csType, setCsType] = useState<CsType>('문의')
  const [content, setContent] = useState<string>('')
  const { setMessage, setIsSnackbarOpen } = useSnackbarOpenStore()

  return (
    <MainContainer>
      <main className='py-4 px-5 space-y-4 lg:py-8 lg:space-y-6'>
        <FormControl fullWidth>
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
        {/*<button*/}
        {/*  onClick={submitCSContent}*/}
        {/*  className={'w-full py-4 rounded-lg text-base font-bold lg:mt-20 lg:text-lg'*/}
        {/*    + (content.length > 10 ? ' bg-blue-500 text-gray-50 shadow-button' : ' bg-gray-200 text-gray-400')}*/}
        {/*>*/}
        {/*  전송하기*/}
        {/*</button>*/}
      </main>
    </MainContainer>
  )
}

export default CustomerService