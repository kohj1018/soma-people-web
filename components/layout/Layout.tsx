import React from 'react'
import Head from 'next/head'
import BottomCenterSnackbar from '../common/BottomCenterSnackbar'
import { useBottomNavValueStore, useSnackbarOpenStore } from '../../stores/stores'
import MobileBottomNavigationBar from './MobileBottomNavigationBar'
import { useRouter } from 'next/router'

interface Props {
    children: React.ReactNode
}

function Layout({ children }: Props) {
  const router = useRouter()
  // const [selectedTap, setSelectedTap] = useState<MenuType>('홈')
  const { selectedTap, setSelectedTap } = useBottomNavValueStore()
  const { message, isSnackbarOpen, setIsSnackbarOpen } = useSnackbarOpenStore()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className='relative min-h-screen h-full min-w-[300px] w-full bg-white'>
        {children}
        <MobileBottomNavigationBar router={router} selectedTap={selectedTap} setSelectedTap={setSelectedTap} />
        <BottomCenterSnackbar isSnackbarOpen={isSnackbarOpen} setIsSnackbarOpen={setIsSnackbarOpen} message={message} />
      </div>
    </>
  )
}

export default Layout