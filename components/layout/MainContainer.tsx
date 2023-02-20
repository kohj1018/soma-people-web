import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const MainContainer = ({ children }: Props) => {
  return (
    <>
     <MainHeader />
      {children}
     <MainFooter />
    </>
  )
}

export default MainContainer