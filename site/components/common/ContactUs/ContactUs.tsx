interface ContactUsProps {
  componentStyle: any
  adjustmentObject: any
}

const ContactUs: React.FC<ContactUsProps> = ({
  componentStyle,
  adjustmentObject,
}) => {
  const contactUsName = 'ContactUs'
  const cs = componentStyle[contactUsName]
  const ao = adjustmentObject[contactUsName]

  const titleName = 'Title'
  const titleCS = cs[titleName]

  const descriptionName = 'Description'
  const descriptionCS = cs[descriptionName]

  const btnTextName = 'BtnText'
  const btnTextCS = cs[btnTextName]

  let titleColor = titleCS.fontColor ? titleCS.fontColor : ''
  let titleFontWeight = titleCS.fontWeight ? titleCS.fontWeight : ''
  let titleFontSize = titleCS.fontSize ? titleCS.fontSize : ''

  const titleClassName = `${titleColor} ${titleFontWeight} ${titleFontSize}`

  let descriptionSize = descriptionCS.fontSize ? descriptionCS.fontSize : ''
  let descriptionFontWeight = descriptionCS.fontWeight
    ? descriptionCS.fontWeight
    : ''
  let descriptionMargin = descriptionCS.margin ? descriptionCS.margin : ''

  const descriptionClassName = `${descriptionSize} ${descriptionFontWeight} ${descriptionMargin}`

  let btnTextColor = btnTextCS.fontColor ? btnTextCS.fontColor : ''
  let btnTextPadding = btnTextCS.padding ? btnTextCS.padding : ''
  let btnTextBG = btnTextCS.backgroundColor ? btnTextCS.backgroundColor : ''

  const btnTextClassName = `${btnTextColor} ${btnTextPadding} ${btnTextBG}`
  // text-5xl
  return (
    <div className="flex items-center justify-center h-full">
      <div className="absolute text-center max-w-3xl mx-6 z-20">
        <h1 className={titleClassName}>{ao.Content.title}</h1>
        <p className={descriptionClassName}>{ao.Content.description}</p>
        <a href={ao.Button.href}>
          <button className={btnTextClassName}>{ao.Button.text}</button>
        </a>
      </div>

      <img
        className="h-[60vh] w-full object-cover opacity-30"
        src={ao.Image.src}
      />
    </div>
  )
}
export default ContactUs
