/** 특수문자 검사 함수 (괜찮으면 true 반환) */
export function checkCharacter(
  text: string,
  canContainSpace: boolean,
  setMessage: (message: string) => void): boolean
{
  const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi
  const regExpWithoutSpace = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi

  if (!text) { // 값 입력하지 않은 경우 있을 수 있으니 처리
    setMessage("값을 입력해주세요.")
    return false
  }

  if (canContainSpace) {
    if (regExpWithoutSpace.test(text)) {
      setMessage("특수 문자는 입력하실 수 없습니다.")
      return false
    }
  } else {
    if (regExp.test(text)) {
      setMessage("특수 문자, 공백은 입력하실 수 없습니다.")
      return false
    }
  }

  return true
}