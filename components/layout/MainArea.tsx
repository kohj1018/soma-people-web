import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

function MainArea({ children, className = '' }: Props) {
  return (
    <main className={'paddingHeader paddingBottom lg:mainWidthLimit ' + className}>
      {children}
    </main>
  )
}

export default MainArea