import { UserType } from '../../utils/types/userType'
import { THIS_YEAR_CARDINAL_NUM } from '../../utils/config'
import LocalFireDepartment from '@mui/icons-material/LocalFireDepartment'
import School from '@mui/icons-material/School'
import LocalLibrary from '@mui/icons-material/LocalLibrary'
import LocalPolice from '@mui/icons-material/LocalPolice'
import AccountBalance from '@mui/icons-material/AccountBalance'
import React, { useEffect, useState } from 'react'

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

  switch (userType) {
    case '연수생':
      if (cardinalNum === THIS_YEAR_CARDINAL_NUM) {
        return (
          <CustomUserTypeTag textColor='text-blue-500' bgColor='bg-blue-50' processedUserType={processedUserType}>
            <LocalFireDepartment className='!w-4 !h-4 text-blue-500 lg:!w-5 lg:!h-5' />
          </CustomUserTypeTag>
        )
      } else {
        return (
          <CustomUserTypeTag textColor='text-indigo-500' bgColor='bg-indigo-50' processedUserType={processedUserType}>
            <School className='!w-4 !h-4 text-indigo-500 lg:!w-5 lg:!h-5' />
          </CustomUserTypeTag>
        )
      }
    case '준비생':
      return (
        <CustomUserTypeTag textColor='text-emerald-500' bgColor='bg-emerald-50' processedUserType={processedUserType}>
          <LocalLibrary className='!w-4 !h-4 text-emerald-500 lg:!w-5 lg:!h-5' />
        </CustomUserTypeTag>
      )
    case '멘토':
      return (
        <CustomUserTypeTag textColor='text-purple-500' bgColor='bg-purple-50' processedUserType={processedUserType}>
          <LocalPolice className='!w-4 !h-4 text-purple-500 lg:!w-5 lg:!h-5' />
        </CustomUserTypeTag>
      )
    case '사무국':
      return (
        <CustomUserTypeTag textColor='text-pink-500' bgColor='bg-pink-50' processedUserType={processedUserType}>
          <AccountBalance className='!w-4 !h-4 text-pink-500 lg:!w-5 lg:!h-5' />
        </CustomUserTypeTag>
      )
    default:
      return (
        <CustomUserTypeTag textColor='text-gray-200' bgColor='bg-gray-50' processedUserType={processedUserType}>
          <></>
        </CustomUserTypeTag>
      )
  }
}

export default UserTypeTag

interface CustomUserTypeTagProps {
  children: React.ReactNode
  textColor: string
  bgColor: string
  processedUserType: string
}
function CustomUserTypeTag({ children, textColor, bgColor, processedUserType }: CustomUserTypeTagProps) {
  return (
    <span className={'px-1.5 py-1 inline-flex items-center space-x-0.5 rounded ' + bgColor}>
      {children}
      <p className={'text-xs font-semibold text-gray-600 lg:text-sm ' + textColor}>{processedUserType}</p>
    </span>
  )
}