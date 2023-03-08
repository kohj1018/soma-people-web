import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import { useRouter } from 'next/router'
import Clear from '@mui/icons-material/Clear'
import MainArea from '../../components/layout/MainArea'
import { TERMS_OF_USE } from '../../utils/constants/termsAndPolicy'

const TermsOfUse: NextPage = () => {
  const router = useRouter()

  return (
    <MainContainer>
      <header className='fixed h-14 top-0 inset-x-0 px-5 py-3.5 flex items-center justify-center bg-white z-50 lg:hidden'>
        <button
          onClick={() => router.back()}
          className='absolute left-5'
        >
          <Clear className='!w-6 !h-6 text-gray-700' />
        </button>
        <p className='text-base font-semibold text-gray-700'>서비스이용약관</p>
        <div className='absolute bottom-0 inset-x-0 h-px bg-gray-100'></div>
      </header>

      <MainArea className='mt-8 px-5 pb-7'>
        <div className='p-4 rounded-xl border border-gray-100'>
          {TERMS_OF_USE}
        </div>
      </MainArea>
    </MainContainer>
  )
}

export default TermsOfUse