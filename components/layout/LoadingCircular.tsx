import { CircularProgress } from '@mui/material'

/** 부모 태그에 relative 속성 있어야 정중앙에 위치함 */
function LoadingCircular() {
  return (
    <div className='moveToCenter'>
      <CircularProgress />
    </div>
  )
}

export default LoadingCircular