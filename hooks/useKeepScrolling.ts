import { useEffect } from 'react'

/** 스크롤 위치 유지해주는 Hook */
function useKeepScrolling(scrollY: number) {
  useEffect(() => {
    // 기본값이 0이기 때문에 스크롤 값이 저장됐을 때에만 window를 스크롤 시킴
    if (scrollY !== 0) setTimeout(() => window.scrollTo(0, scrollY), 2)
  }, [])
}

export default useKeepScrolling