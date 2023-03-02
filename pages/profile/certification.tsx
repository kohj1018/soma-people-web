import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import MainArea from '../../components/layout/MainArea'
import MobileCancelHeader from '../../components/layout/mobileHeader/MobileCancelHeader'
import Image from 'next/image'
import somaCertification from '../../public/somaCertification.png'
import useDrivePicker from 'react-google-drive-picker'
import { useEffect, useState } from 'react'
import { sendCertificationRequest } from '../../utils/airtableConfig'
import useUserInfo from '../../hooks/useUserInfo'
import { useRouter } from 'next/router'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useCertificationRequestStore } from '../../stores/localStorageStore/stores'

const Certification: NextPage = () => {
  const router = useRouter()
  const userInfo = useUserInfo()
  const { isAlreadyRequest, setIsAlreadyRequest } = useCertificationRequestStore()
  const [openPicker, authResponse] = useDrivePicker()
  const [uploadFileName, setUploadFileName] = useState<string>('')
  const [uploadFileUrl, setUploadFileUrl] = useState<string>('')
  const { setMessage } = useSnackbarOpenStore()

  // 이미 인증받았거나 인증 요청한 상태이면 Redirect
  useEffect(() => {
    if (!!userInfo) {
      if (userInfo.isCertified) {
        setMessage('이미 인증 받았습니다.')
        router.back()
      } else if (isAlreadyRequest) {
        setMessage('이미 인증 요청을 보냈습니다. 조금만 기다려주세요.')
        router.back()
      }
    }
  }, [userInfo])

  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.GOOGLE_DRIVE_CLIENT_ID as string,
      developerKey: process.env.GOOGLE_DRIVE_API_KEY as string,
      viewId: 'DOCS_IMAGES',
      token: process.env.GOOGLE_DRIVE_ACCESS_TOKEN as string,
      showUploadView: true,
      showUploadFolders: false,
      disableDefaultView: true,
      multiselect: false,
      setParentFolder: process.env.GOOGLE_DRIVE_TARGET_FOLDER_ID,
      locale: 'ko',
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          setUploadFileName('')
        }
        if (data.action === 'picked') {
          setUploadFileName(data.docs[0].name)
          setUploadFileUrl(data.docs[0].url)
        }
      },
    })
  }

  const handleSubmit = () => {
    if (!!userInfo) {
      if (uploadFileUrl) {
        sendCertificationRequest(userInfo?.userId, userInfo?.name, userInfo?.userType, userInfo?.cardinalNum, uploadFileUrl)
        setIsAlreadyRequest(true)
        setMessage('인증 신청이 완료되었습니다.')
        router.back()
      } else {
        setMessage('캡처 화면을 먼저 업로드 해주세요.')
      }
    }
  }

  return (
    <MainContainer>
      <MobileCancelHeader title='소마인 인증하기' buttonFunc={handleSubmit} />

      <MainArea>
        <p className='mt-8 px-5 text-base font-semibold text-gray-700'>
          ✅ 소마 홈페이지 로그인 후, 아래 사진과 같이<br/>
          마이페이지의 가입 유형이 보이게 캡쳐해주세요.<br/>
          <span className='text-sm font-medium text-blue-400'>
            (이름, 가입유형을 제외한 정보는 가려주세요.)
          </span>
        </p>

        <div className='mt-6 px-5 py-4 bg-gray-50'>
          <Image
            src={somaCertification}
            className='w-full h-auto'
            alt='소마인 인증방법 예시 사진'
          />
        </div>

        <div className='mt-8 w-full px-5 flex items-center justify-between space-x-3'>
          <button
            onClick={handleOpenPicker}
            className='px-3 py-2 rounded bg-slate-900'
          >
            <p className='text-base font-semibold text-white whitespace-nowrap'>사진 업로드</p>
          </button>
          {uploadFileName &&
            <p className='w-full px-3 py-2.5 rounded bg-gray-100 text-sm font-medium text-gray-400 truncate'>{uploadFileName}</p>
          }
        </div>
      </MainArea>
    </MainContainer>
  )
}

export default Certification