import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import MainArea from '../../components/layout/MainArea'
import MobileCancelHeader from '../../components/layout/mobileHeader/MobileCancelHeader'
import Image from 'next/image'
import somaCertification from '../../public/somaCertification.png'
import { useEffect, useState } from 'react'
import { sendCertificationRequest } from '../../utils/airtableConfig'
import useUserInfo from '../../hooks/useUserInfo'
import { useRouter } from 'next/router'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useCertificationRequestStore } from '../../stores/localStorageStore/stores'
import dayjs from 'dayjs'

const Certification: NextPage = () => {
  const router = useRouter()
  const userInfo = useUserInfo()
  const { isAlreadyRequest, setIsAlreadyRequest } = useCertificationRequestStore()

  const [image, setImage] = useState<File | null>(null)
  const [uploadImageUrl, setUploadImageUrl] = useState<string>('')
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

  const uploadImage = () => {
    if (!!image) {
      if (uploadImageUrl) {
        setMessage('이미 업로드 되었습니다. 상단의 등록버튼을 눌러 완료해주세요.')
      } else {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET as string)
        data.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME as string)
        if (!!userInfo) {
          data.append('public_id', userInfo.userId + '_' + userInfo.name + '_' + (userInfo.cardinalNum ? `${userInfo.cardinalNum}기` : '') + '_' + userInfo.userType + '_' + dayjs().format('YY-MM-DD_HH:mm'))
        }

        fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'post',
          body: data
        }).then((res) => res.json())
          .then((data) => {
            setUploadImageUrl(data.url)
            setMessage('업로드 성공! 등록 버튼을 눌러주세요.')
          })
          .catch((err) => {
            setMessage('업로드 중 에러가 발생했습니다.')
          })
      }
    } else {
      setMessage('파일을 먼저 선택해주세요.')
    }
  }

  const handleSubmit = () => {
    if (!!userInfo) {
      if (uploadImageUrl) {
        sendCertificationRequest(userInfo?.userId, userInfo?.name, userInfo?.userType, userInfo?.cardinalNum, uploadImageUrl)
        setIsAlreadyRequest(true)
        setMessage('인증 신청이 완료되었습니다.')
        router.back()
      } else {
        setMessage('사진 업로드 버튼을 눌러주세요.')
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
          <input
            type='file'
            onChange={(e) => { if (e.target.files) setImage(e.target.files[0]) }}
          />
          <button
            onClick={uploadImage}
            className='px-3 py-2 rounded bg-slate-900'
          >
            <p className='text-base font-semibold text-white whitespace-nowrap'>사진 업로드</p>
          </button>
        </div>
        {uploadImageUrl &&
          <p className='mt-2 px-5 text-right text-sm font-medium text-green-400'>업로드가 완료되었습니다!</p>
        }
      </MainArea>
    </MainContainer>
  )
}

export default Certification