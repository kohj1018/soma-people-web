import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import React from 'react'
import Head from 'next/head'

interface Props {
  children: React.ReactNode
  showFooterOnMobile?: boolean
}

const MainContainer = ({ children, showFooterOnMobile = false }: Props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <MainHeader />
      {children}
      <MainFooter showFooterOnMobile={showFooterOnMobile} />
    </>
  )
}

export default MainContainer