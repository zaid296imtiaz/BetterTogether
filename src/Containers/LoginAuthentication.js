import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  Button,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { Colors } from '@/Theme/Variables'
import { InputField } from '@/Components'
import { navigate } from '@/Navigators/utils'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const LoginAuthentication = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const { Images, darkMode } = useTheme()

  const [userId, setUserId] = useState('9')
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()

  useEffect(() => {
    fetchOne(userId)
  }, [fetchOne, userId])

  const onChangeTheme = ({ theme, darkMode }) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  return (
    // <ImageBackground
    //   source={Images.auth_background}
    //   style={[
    //     Layout.colCenter,
    //     {
    //       flex: 1,
    //       height: screenHeight,
    //       width: screenWidth,
    //     },
    //   ]}
    //   resizeMode="cover"
    // >
    <View
      style={[
        Layout.colCenter,
        Common.backgroundDefault,
        {
          flex: 1,
        },
      ]}
    >
      <Brand height={120} width={150} label />
      <View style={{ height: 50 }} />
      <View
        style={[
          Common.backgroundTranslucent,
          {
            height: screenHeight / 1.5,
            width: '90%',
            // backgroundColor: Colors.translucent,
            borderRadius: 10,
          },
        ]}
      >
        <ScrollView
          style={[Layout.fill]}
          contentContainerStyle={[
            // Layout.fill,
            // Layout.colHCenter,
            Gutters.regularHPadding,
            Gutters.regularVPadding,
            // Layout.justifyContentBetween
          ]}
        >
          <View
            style={[
              Layout.justifyContentBetween,
              { height: screenHeight / 1.6 },
            ]}
          >
            <View
              style={[
                [
                  Layout.colHCenter,
                  Gutters.regularHPadding,
                  Gutters.regularVPadding,
                ],
              ]}
            >
              {(isLoading || isFetching) && <ActivityIndicator />}
              {!isSuccess ? (
                <View>
                <Text style={[Fonts.titleSmall]}>Hello</Text>
                <Text style={[Fonts.textSmall, { fontWeight: '300' }]}>
                  Sign In to you account
                </Text>
              </View>
              ) : (
                <View>
                  <Text style={[Fonts.titleSmall]}>Hello</Text>
                  <Text style={[Fonts.textSmall, { fontWeight: '300' }]}>
                    Sign In to you account
                  </Text>
                </View>
              )}
            </View>
            <View
              style={[
                // Layout.row,
                // Layout.rowHCenter,
                Gutters.smallHPadding,
                Gutters.largeVMargin,
                // Common.backgroundPrimary,
              ]}
            >
              <InputField placeholder="Enter Email" label="Email Address" />
              <View style={{ height: 15 }} />
              <InputField placeholder="Enter Password" label="Password" />
              <View style={{ height: 15 }} />
              <TouchableOpacity onPress={() => {}}>
                <Text style={[Fonts.textPrimarySmall, Fonts.textRight]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[Common.button.rounded, Gutters.regularBMargin]}
              onPress={() => {
                navigate('HomeScreen')
              }}
            >
              <Text
                style={[
                  Fonts.textRegular,
                  { color: darkMode ? Colors.white : Colors.white },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <View style={[Layout.row, Layout.rowCenter]}>
              <Text style={[Fonts.textSmall]}>Don't have an account?</Text>
              <View style={{ width: 5 }} />
              <TouchableOpacity onPress={() => navigate('AuthScreenSignUp')}>
                <Text style={[Fonts.textRight, Fonts.textPrimarySmall]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
    // </ImageBackground>
  )
}

export default LoginAuthentication
