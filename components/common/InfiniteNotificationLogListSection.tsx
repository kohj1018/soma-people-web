import { useInView } from 'react-intersection-observer'
import { notificationLogKeys } from '../../utils/constants/reactQueryKeyConstants'
import { ARBITRARY_LARGEST_LAST_ID, INFINITE_SCROLL_LOAD_SIZE } from '../../utils/constants/systemConstants'
import { getNotificationLogInfoListInfinitely } from '../../utils/apis/notificationLogsApi'
import { Fragment, useEffect } from 'react'
import { isNotEmptyArray } from '../../utils/functions/isNotEmptyArray'
import NotificationLog from './NotificationLog'
import Image from 'next/image'
import noNotificationLogsIcon from '../../public/icon/noNotificationLogsIcon.svg'
import LoadingCircular from '../layout/LoadingCircular'
import { useInfiniteQuery } from '@tanstack/react-query'

interface Props {
  userId: number
}

function InfiniteNotificationLogListSection({ userId }: Props) {
  const { ref, inView } = useInView()
  const { data: notificationLogInfoList, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery(
    notificationLogKeys.list(userId),
    ({ pageParam = ARBITRARY_LARGEST_LAST_ID }) => getNotificationLogInfoListInfinitely(userId, pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextLastNotificationLogId : undefined
    }
  )

  //바닥에 닿으면 새로 불러오기
  useEffect(() => {
    if (!!userId && inView) {
      if (!!notificationLogInfoList && notificationLogInfoList.pages[notificationLogInfoList.pages.length - 1].notificationLogList.length > INFINITE_SCROLL_LOAD_SIZE - 1) {  // 처음 기록이 없을 때 invalidateQueries 안먹히는거 해결하는 부분
        fetchNextPage()
      }
    }
  }, [inView])

  return (
    <>
      <section className='relative grow mt-4 space-y-3 lg:mt-12'>
        {isNotEmptyArray(notificationLogInfoList?.pages[0].notificationLogList) ? (
          <>
            {notificationLogInfoList?.pages.map((page, index) => (
              <Fragment key={index}>
                {page.notificationLogList.map((notificationLogInfo) =>
                  <NotificationLog key={notificationLogInfo.notificationLogId} notificationLogInfo={notificationLogInfo} />
                )}
              </Fragment>
            ))}
          </>
        ) : (
          <div className='moveToCenter flex flex-col items-center space-y-5'>
            <Image
              src={noNotificationLogsIcon}
              className='w-[3.75rem] h-[3.75rem]'
              alt='알림 기록 없음 아이콘'
            />
            <p className='text-base font-semibold text-gray-400'>알림이 없어요</p>
          </div>
        )}
      </section>

      {/* 무한 스크롤 옵저버 */}
      {isFetchingNextPage ? <LoadingCircular /> : <div ref={ref}></div>}
    </>
  )
}

export default InfiniteNotificationLogListSection