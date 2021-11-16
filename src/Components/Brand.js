import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text } from 'react-native'
import { useTheme } from '@/Hooks'

const Brand = ({ height, width, mode, label }) => {
  const { Layout, Images, Fonts } = useTheme()

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} source={Images.logo} resizeMode={mode} />
      {label && <Text style={[Fonts.textPrimaryRegular, {fontWeight: '700'}]}>Better Together</Text>}
    </View>
  )
}

Brand.propTypes = {
  height: PropTypes.number,
  mode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'repeat', 'center']),
  width: PropTypes.number,
}

Brand.defaultProps = {
  height: 200,
  mode: 'contain',
  width: 200,
  label: false
}

export default Brand
