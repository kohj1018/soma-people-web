import Home from '@mui/icons-material/Home'
import Article from '@mui/icons-material/Article'
import Person from '@mui/icons-material/Person'
import { useState } from 'react'
import { useRouter } from 'next/router'

type MenuType = '홈' | '게시판' | '프로필'

function MobileBottomNavigationBar() {
  const router = useRouter()
  const [selectedTap, setSelectedTap] = useState<MenuType>('홈')

  const changeTap = (menuName: MenuType) => {
    setSelectedTap(menuName)
    switch (menuName) {
      case '홈':
        router.push('/')
        break
      case '게시판':
        router.push('/')
        break
      case '프로필':
        router.push('/')
        break
    }
  }

  return (
    <footer className='fixed bottom-0 inset-x-0 py-1.5 flex items-center justify-center space-x-12 shadow-nav lg:hidden'>
      <button onClick={() => changeTap('홈')} className={'flex flex-col items-center space-y-1' + (selectedTap === '홈' ? ' text-gray-700' : ' text-gray-200')}>
        <Home className='w-6 h-6' />
        <p className='text-xs font-bold'>홈</p>
      </button>
      <button onClick={() => changeTap('게시판')} className={'flex flex-col items-center space-y-1' + (selectedTap === '게시판' ? ' text-gray-700' : ' text-gray-200')}>
        <Article className='w-6 h-6' />
        <p className='text-xs font-bold'>게시판</p>
      </button>
      <button onClick={() => changeTap('프로필')} className={'flex flex-col items-center space-y-1' + (selectedTap === '프로필' ? ' text-gray-700' : ' text-gray-200')}>
        <Person className='w-6 h-6' />
        <p className='text-xs font-bold'>프로필</p>
      </button>
    </footer>
  )
}

export default MobileBottomNavigationBar