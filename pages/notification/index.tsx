import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import Settings from '@mui/icons-material/Settings'
import Link from 'next/link'
import MainArea from '../../components/layout/MainArea'
import useUserInfo from '../../hooks/useUserInfo'
import { useNotificationLogsScrollYStore } from '../../stores/scrollStore/scrollStores'
import useKeepScrolling from '../../hooks/useKeepScrolling'
import dynamic from 'next/dynamic'
import LoadingCircular from '../../components/layout/LoadingCircular'
import { isWebView } from '../../utils/functions/isWebView'
const InfiniteNotificationLogListSection = dynamic(() => import('../../components/common/InfiniteNotificationLogListSection'), {loading: () => <LoadingCircular />, ssr: false})

const Notification: NextPage = () => {
  const userInfo = useUserInfo()
  const notificationLogsScrollY = useNotificationLogsScrollYStore(state => state.notificationLogsScrollY) // 스크롤 위치 저장

  // 스크롤 위치 유지
  useKeepScrolling(notificationLogsScrollY)

  if (!userInfo) return <LoadingCircular />

  return (
    <MainContainer>
      <header className='absolute top-0 inset-x-0 px-5 py-3.5 flex items-center justify-between lg:hidden'>
        <h1 className='text-xl font-semibold text-gray-700'>알림</h1>
        {isWebView() &&
          <Link href='/'>
            <Settings className='!w-6 !h-6 text-gray-700' />
          </Link>
        }
      </header>

      <MainArea className='min-h-screen px-5 flex flex-col'>
        {!!userInfo &&
          <InfiniteNotificationLogListSection userId={userInfo.userId} />
        }
      </MainArea>
    </MainContainer>
  )
}

export default Notification