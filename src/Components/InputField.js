import React from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, Text } from 'react-native'
import { useTheme } from '@/Hooks'

const InputField = ({
  height,
  margin,
  padding,
  placeholder,
  onChangeText,
  value,
  label,
  ...rest
}) => {
  const { Fonts } = useTheme()

  return (
    <View>
      <Text style={[Fonts.textSmall]}>{label}</Text>
      <TextInput
        style={{ height: height, margin: margin, padding: padding }}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
    </View>
  )
}

InputField.propTypes = {
  height: PropTypes.number,
  margin: PropTypes.number,
  padding: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  label: PropTypes.string,
}

InputField.defaultProps = {
  height: 40,
  margin: 0,
  padding: 10,
  borderBottomWidth: 1,
  placeholder: 'Enter value...',
  onChangeText: () => {},
  label: 'Text Input',
}

export default InputField
