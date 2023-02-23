import React from 'react'
import Head from 'next/head'
import BottomCenterSnackbar from '../common/BottomCenterSnackbar'
import { useSnackbarOpenStore } from '../../stores/stores'

interface Props {
    children: React.ReactNode
}

function Layout({ children }: Props) {
  const { message, isSnackbarOpen, setIsSnackbarOpen } = useSnackbarOpenStore()

  return (
    <>

      <div className='relative min-h-screen h-full min-w-[300px] w-full bg-white'>
        {children}
        <BottomCenterSnackbar isSnackbarOpen={isSnackbarOpen} setIsSnackbarOpen={setIsSnackbarOpen} message={message} />
      </div>
    </>
  )
}

export default Layout