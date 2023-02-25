import { UserType } from '../../utils/types/userType'
import { THIS_YEAR_CARDINAL_NUM } from '../../utils/config'
import LocalFireDepartment from '@mui/icons-material/LocalFireDepartment'
import School from '@mui/icons-material/School'
import LocalLibrary from '@mui/icons-material/LocalLibrary'
import LocalPolice from '@mui/icons-material/LocalPolice'
import AccountBalance from '@mui/icons-material/AccountBalance'
import { useEffect, useState } from 'react'

interface Props {
  userType: UserType
  cardinalNum: number | null
  isAnonymous: boolean
}

function UserTypeTag({ userType, cardinalNum, isAnonymous }: Props) {
  const [processedUserType, setProcessedUserType] = useState<string>(userType)

  useEffect(() => {
    let temp: string = userType
    if (userType === '연수생') {
      if (cardinalNum !== THIS_YEAR_CARDINAL_NUM) {
        temp = '수료생'
      }
    }

    if (!isAnonymous && (temp === '연수생' || temp === '수료생')) {
      setProcessedUserType(cardinalNum + '기 ' + temp)
    } else {
      setProcessedUserType(temp)
    }
  }, [])

  return (
    <span className='px-1.5 py-1 inline-flex items-center space-x-0.5 rounded bg-gray-100'>
      <UserTypeIcon userType={userType} cardinalNum={cardinalNum} />
      <p className='text-xs font-semibold text-gray-600'>{processedUserType}</p>
    </span>
  )
}

export default UserTypeTag

interface UserTypeIconProps {
  userType: UserType
  cardinalNum: number | null
}
function UserTypeIcon({ userType, cardinalNum }: UserTypeIconProps) {
  switch (userType) {
    case '연수생':
      if (cardinalNum === THIS_YEAR_CARDINAL_NUM) {
        return <LocalFireDepartment className='w-4 h-4 text-blue-500' />
      } else {
        return <School className='w-4 h-4 text-blue-500' />
      }
    case '준비생':
      return <LocalLibrary className='w-4 h-4 text-blue-500' />
    case '멘토':
      return <LocalPolice className='w-4 h-4 text-blue-500' />
    case '사무국':
      return <AccountBalance className='w-4 h-4 text-blue-500' />
    default:
      return <></>
  }
}