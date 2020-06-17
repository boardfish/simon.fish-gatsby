import useSiteMetadata from './use-site-metadata'
import tinycolor from 'tinycolor2'

export default ({ color, backgroundColor, darkenAmount }, fallbacks = {
    colorLight: 'black',
    colorDark: 'white',
    backgroundColor: '#069'
}) => {
  const colors = useSiteMetadata("colors")
  const bgColor = backgroundColor || (
    darkenAmount
    ? tinycolor(colors.primary).darken(darkenAmount).toString()
    : fallbacks.backgroundColor
  )
  const fgColor = color || (
    tinycolor(bgColor).isLight() ? fallbacks.colorLight : fallbacks.colorDark
  )
  return { bgColor, fgColor }
}