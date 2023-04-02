import Image from 'next/image'
import Link from 'next/link'
import ArrowOutward from '@mui/icons-material/ArrowOutward'
import bannerLogo from '../../public/bannerLogo.svg'

interface Props {
  showFooterOnMobile: boolean
}

const MainFooter = ({ showFooterOnMobile }: Props) => {
  return (
    <footer className={'px-5 py-6 flex-wrap justify-between bg-gray-50 lg:px-36 lg:py-12' + (showFooterOnMobile ? ' flex' : ' hidden lg:flex')}>
      <div className='w-full lg:w-[10rem]'>
        <Image
          src={bannerLogo}
          className='w-[6.8125rem] h-auto lg:w-[10rem]'
          alt='소마인 로고'
        />
      </div>
      <article className='pt-6 w-full lg:w-fit lg:pt-0'>
        <header className='text-sm font-bold text-gray-500 lg:text-lg'>개인정보 및 서비스 약관</header>
        <section className='mt-4 flex flex-col space-y-2 text-xs font-medium text-gray-900 lg:text-sm'>
          <Link
            href='/customerService'
            className='w-fit'
          >
            고객문의
          </Link>
          <Link
            // href='https://somapeople.notion.site/d81fc7603cc74e6a8b26341b18d83561'
            href='/etc/privacyPolicy'
            className='w-fit font-bold text-gray-900'
          >
            개인정보처리방침<span className='ml-1'><ArrowOutward className='!w-4 !h-4 text-blue-500' /></span>
          </Link>
          <Link
            // href='https://somapeople.notion.site/d02962c43454426cbd5d1b2c965af90a'
            href='/etc/termsOfUse'
            className='w-fit'
          >
            서비스 이용약관
          </Link>
        </section>
      </article>

      <article className='pt-9 space-y-1.5 text-xs font-semibold text-gray-600 lg:pt-36 lg:text-right lg:text-sm'>
        <p>대표 관리자 | 고병욱</p>
        <p>이메일 | somapeople.official@gmail.com</p>
        <p>주소 | 서울시 강남구 테헤란로 311(역삼동) 아남타워빌딩 7층</p>
      </article>
    </footer>
  )
}

export default MainFooter