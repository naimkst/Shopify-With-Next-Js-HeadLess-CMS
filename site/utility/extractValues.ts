export const extractValues = (stylesObject: {}) => {
  const stylesClasses = Object.values(stylesObject).join(' ')
  return stylesClasses
}
