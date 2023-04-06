import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import MobileCenterTitleHeader from '../../components/layout/mobileHeader/MobileCenterTitleHeader'
import MainArea from '../../components/layout/MainArea'
import Image from 'next/image'
import schedule1 from '../../public/schedule/schedule1.png'
import schedule2 from '../../public/schedule/schedule2.png'
import schedule3 from '../../public/schedule/schedule3.png'

const Schedule: NextPage = () => {
  return (
    <MainContainer>
      <MobileCenterTitleHeader title='14기 연중일정' />

      <MainArea className='px-5'>
        <div className='mt-4 space-y-3'>
          <Image
            src={schedule1}
            className='w-full h-auto'
            alt='스케줄1'
          />
          <Image
            src={schedule2}
            className='w-full h-auto'
            alt='스케줄2'
          />
          <Image
            src={schedule3}
            className='w-full h-auto'
            alt='스케줄3'
          />
        </div>
      </MainArea>
    </MainContainer>
  )
}

export default Schedule