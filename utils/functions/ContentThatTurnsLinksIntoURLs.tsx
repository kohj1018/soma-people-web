interface Props {
  content: string
}

function ContentThatTurnsLinksIntoURLs({ content }: Props) {
  const urlRegex = /(https?:\/\/\S+)/
  const elements = content.split(urlRegex)
  return (
    <>
      {elements.map((element, index) => {
        if (element.match(urlRegex)) {
          return (
            <a key={index} href={element} className='text-emerald-500 font-semibold' style={{textDecoration: 'underline'}}>
              {element}
            </a>
          )
        } else {
          return (
            <span key={index}>
              {element}
            </span>
          )
        }
      })}
    </>
  )
}

export default ContentThatTurnsLinksIntoURLs