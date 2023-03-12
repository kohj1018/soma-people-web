import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import MainArea from '../../components/layout/MainArea'
import MobileCancelHeader from '../../components/layout/mobileHeader/MobileCancelHeader'
import Image from 'next/image'
import somaCertification from '../../public/somaCertification.png'
import { useEffect, useRef, useState } from 'react'
import { sendCertificationRequest } from '../../utils/airtableConfig'
import useUserInfo from '../../hooks/useUserInfo'
import { useRouter } from 'next/router'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useCertificationRequestStore } from '../../stores/localStorageStore/stores'
import dayjs from 'dayjs'
import LoadingCircular from '../../components/layout/LoadingCircular'
import SEO from '../../components/SEO'

const Certification: NextPage = () => {
  const router = useRouter()
  const userInfo = useUserInfo()
  const { isAlreadyRequest, setIsAlreadyRequest } = useCertificationRequestStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [image, setImage] = useState<File | null>(null)
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

  // 사진 업로드하면 안내 메시지
  useEffect(() => {
    if (!!image) {
      setMessage('업로드가 완료되었습니다. 상단의 등록버튼을 눌러 완료해주세요.')
    }
  }, [image])

  const [activateButton, setActivateButton] = useState<boolean>(false)
  useEffect(() => { if (!!image) setActivateButton(true); else setActivateButton(false) }, [image]) // 등록 버튼 활성화
  const handleSubmit = () => {
    if (!userInfo) {
      setMessage('유저 정보 오류!')
      return
    }

    if (!image) {
      setMessage('사진을 먼저 업로드 해주세요.')
      return
    }

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      setMessage('잠시만 기다려주세요...')
      return
    }

    setIsLoading(true)
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET )
    data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME )
    data.append('public_id', userInfo.userId + '_' + userInfo.name + '_' + (userInfo.cardinalNum ? `${userInfo.cardinalNum}기` : '') + '_' + userInfo.userType + '_' + dayjs().format('YY-MM-DD_HH:mm'))

    fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'post',
      body: data
    }).then((res) => res.json())
      .then((data) => {
        sendCertificationRequest(userInfo.userId, userInfo.name, userInfo.userType, userInfo.cardinalNum, data.url)
        setIsAlreadyRequest(true)
        setMessage('인증 신청이 완료되었습니다.')
        router.back()
      })
      .catch((err) => {
        setMessage('서버에 업로드 중 에러가 발생했습니다.')
        setIsLoading(false)
      })
  }

  if (isLoading) return <LoadingCircular />

  return (
    <MainContainer>
      <SEO title='소마인 인증요청' />

      <MobileCancelHeader title='소마인 인증하기' buttonFunc={handleSubmit} activateButton={activateButton} />

      <MainArea>
        <article className='mt-8 px-5 space-y-2.5'>
          <p className='text-base font-semibold text-gray-900'>
            아래 경로를 따라 들어가 예시 사진과 같이<br/>
            가입유형이 보이게 캡처해주세요
          </p>
          <div className='px-3 py-1.5 bg-blue-50'>
            <p className='text-sm font-semibold text-blue-500'>
              소마 홈페이지 로그인<br/>
              {'>'} MyPage {'>'} 회원정보/My git<br/>
              {'>'} 회원정보 수정 {'>'} 기본정보 입력 탭
            </p>
          </div>
        </article>

        <div className='mt-6 px-5 pt-6 pb-4 space-y-4 bg-gray-50'>
          <p className='inline px-1.5 py-1 rounded bg-gray-100 border border-gray-300 text-sm font-semibold text-gray-500'>예시 사진 안내</p>
          <Image
            src={somaCertification}
            className='w-full h-auto border border-gray-200'
            alt='소마인 인증방법 예시 사진'
          />
          <p className='text-xs font-semibold text-red-500'>
            1) 이름, 가입 유형을 제외한 정보는 가려주세요.<br/>
            2) 인증은 소마 구성원만 가능하며, 준비생은 불가합니다.
          </p>
        </div>

        <div className='mt-6 w-full px-5 flex items-center space-x-4 pb-7'>
          <button
            onClick={() => inputRef.current?.click()}
            className={'px-3 py-2 rounded' + (!!image ? ' bg-white border border-gray-700' : ' bg-slate-900 border-none')}
          >
            <p className={'text-base font-semibold whitespace-nowrap' + (!!image ? ' text-gray-700' : ' text-white')}>{!!image ? '다시 선택' : '사진 업로드'}</p>
          </button>
          <div className='w-52 px-6 py-2.5 rounded bg-gray-100'>
            <p className='text-sm font-medium text-gray-400 truncate'>{!!image ? image.name : '등록된 이미지 파일이 없어요.'}</p>
          </div>
        </div>

        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(e) => { if (e.target.files) setImage(e.target.files[0]) }}
        />

        {/*<div className='mt-6 w-full px-5 flex items-center justify-between space-x-3'>*/}
        {/*  <input*/}
        {/*    type='file'*/}
        {/*    accept='image/*'*/}
        {/*    onChange={(e) => { if (e.target.files) setImage(e.target.files[0]) }}*/}
        {/*  />*/}
        {/*  <button*/}
        {/*    onClick={uploadImage}*/}
        {/*    className='px-3 py-2 rounded bg-slate-900'*/}
        {/*  >*/}
        {/*    <p className='text-base font-semibold text-white whitespace-nowrap'>사진 업로드</p>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </MainArea>
    </MainContainer>
  )
}

export default Certification