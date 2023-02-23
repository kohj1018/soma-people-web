import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import React from 'react'
import MobileBottomNavigationBar from './MobileBottomNavigationBar'

interface Props {
  children: React.ReactNode
}

const MainContainer = ({ children }: Props) => {
  return (
    <>
      <MainHeader />
      {children}
      <MainFooter />
      <MobileBottomNavigationBar />
    </>
  )
}

export default MainContainer