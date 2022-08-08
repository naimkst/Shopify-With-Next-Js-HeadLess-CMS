export const extractStyles = (stylesObject: {}) => {
  const stylesClasses = Object.values(stylesObject).join(' ')
  return stylesClasses
}
