/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ FontSize, Colors }) {
  return StyleSheet.create({
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
    },
    titleSmall: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },

    //

    textPrimarySmall: {
      fontSize: FontSize.small,
      color: Colors.primary,
    },
    textPrimaryRegular: {
      fontSize: FontSize.regular,
      color: Colors.primary,
    },
    textPrimaryLarge: {
      fontSize: FontSize.large,
      color: Colors.primary,
    },
    titlePrimarySmall: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.primary,
    },
    titlePrimaryRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.primary,
    },
    titlePrimaryLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.primary,
    },
  })
}
