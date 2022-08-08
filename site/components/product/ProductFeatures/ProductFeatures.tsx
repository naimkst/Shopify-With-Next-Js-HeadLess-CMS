interface ProductFeaturesProps {
  image: string
  imageAlt: string
  componentStyle: any
  adjustmentObject: any
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({
  image,
  imageAlt,
  componentStyle,
  adjustmentObject,
}) => {
  const productFeaturesName = 'ProductFeatures'
  const cs = componentStyle[productFeaturesName]
  const ao = adjustmentObject[productFeaturesName]

  const titleName = 'Title'
  const titleCS = cs[titleName]

  const descriptionName = 'Description'
  const descriptionCS = cs[descriptionName]

  const featuresName = 'Features'
  const featuresCS = cs[featuresName]

  let titleColor = titleCS.fontColor ? titleCS.fontColor : ''
  let titleFontWeight = titleCS.fontWeight ? titleCS.fontWeight : ''
  let titleFontSize = titleCS.fontSize ? titleCS.fontSize : ''

  const titleClassName = `${titleColor} ${titleFontWeight} ${titleFontSize}`

  let descriptionColor = descriptionCS.fontColor ? descriptionCS.fontColor : ''
  let descriptionFontWeight = descriptionCS.fontWeight
    ? descriptionCS.fontWeight
    : ''
  let descriptionMargin = descriptionCS.margin ? descriptionCS.margin : ''

  const descriptionClassName = `${descriptionColor} ${descriptionFontWeight} ${descriptionMargin}`

  let featuresTitleColor = featuresCS.Title.fontColor
    ? featuresCS.Title.fontColor
    : ''
  let featuresTitleFontWeight = featuresCS.Title.fontWeight
    ? featuresCS.Title.fontWeight
    : ''
  const featuresTitleClassName = `${featuresTitleColor} ${featuresTitleFontWeight}`

  let featuresTextColor = featuresCS.Text.fontColor
    ? featuresCS.Text.fontColor
    : ''
  let featuresTextFontSize = featuresCS.Text.fontSize
    ? featuresCS.Text.fontSize
    : ''
  let featuresTextMargin = featuresCS.Text.margin ? featuresCS.Text.margin : ''

  const featuresTextClassName = `${featuresTextColor} ${featuresTextFontSize} ${featuresTextMargin}`

  // text-primary-2 text-3xl font-extrabold

  return (
    <div>
      <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-12 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
        <div>
          <h2 className={titleClassName}>{ao && ao.Title.text}</h2>
          <p className={descriptionClassName}>{ao && ao.Description.text}</p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {ao &&
              ao.Features.map(
                (feature: { name: string; description: string }) => (
                  <div
                    key={feature.name}
                    className="border-t border-gray-200 pt-4"
                  >
                    <dt className={featuresTitleClassName}>{feature.name}</dt>
                    <dd className={featuresTextClassName}>
                      {feature.description}
                    </dd>
                  </div>
                )
              )}
          </dl>
        </div>
        <div className="">
          <img src={image} alt={imageAlt} className="bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
export default ProductFeatures
