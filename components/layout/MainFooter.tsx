import Image from 'next/image'
import mainLogo from '../../public/mainLogo.svg'
import Link from 'next/link'
import ArrowOutward from '@mui/icons-material/ArrowOutward'

interface Props {
  showFooterOnMobile: boolean
}

const MainFooter = ({ showFooterOnMobile }: Props) => {
  return (
    <footer className={'px-5 py-6 bg-gray-800' + (showFooterOnMobile ? ' block' : ' hidden')}>
      <Image
        src={mainLogo}
        className='w-[6.8125rem] h-auto'
        alt='소마인 로고'
      />

      <article className='mt-6'>
        <header className='text-sm font-bold text-gray-50'>개인정보 및 서비스 약관</header>
        <section className='mt-4 flex flex-col space-y-2 text-xs font-medium text-gray-300'>
          <Link href='/customerService'>고객문의</Link>
          <Link
            // href='https://somapeople.notion.site/d81fc7603cc74e6a8b26341b18d83561'
            href='/etc/privacyPolicy'
            className='font-bold text-white'
          >
            개인정보처리방침<span className='ml-1'><ArrowOutward className='!w-4 !h-4 text-blue-100' /></span>
          </Link>
          <Link
            // href='https://somapeople.notion.site/d02962c43454426cbd5d1b2c965af90a'
            href='/etc/termsOfUse'
          >
            서비스 이용약관
          </Link>
        </section>
      </article>

      <article className='mt-9 space-y-1.5'>
        <p className='text-xs font-semibold text-gray-400'>대표 관리자 | <span className='text-gray-300'>고병욱</span></p>
        <p className='text-xs font-semibold text-gray-400'>이메일 | <span className='text-gray-300'>somapeople.official@gmail.com</span></p>
        <p className='text-xs font-semibold text-gray-400'>주소 | <span className='text-gray-300'>서울시 강남구 테헤란로 311(역삼동) 아남타워빌딩 7층</span></p>
      </article>
    </footer>
  )
}

export default MainFooter