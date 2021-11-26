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
  Linking,
  Alert,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { Colors } from '@/Theme/Variables'
import { InputField } from '@/Components'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import axios from 'axios'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const SignUpAuthentication = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const { Images, darkMode } = useTheme()

  const [userId, setUserId] = useState('9')
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()

  const [userObj, setUserObj] = useState({
    address1: '',
    city: '',
    dob: '',
    email: '',
    fullName: '',
    location: '',
    password: '',
    state: '',
    userName: '',
    zip: '',
  })

  useEffect(() => {
    fetchOne(userId)
  }, [fetchOne, userId])

  const onChangeTheme = ({ theme, darkMode }) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  const textFieldOnChange = (value, name) => {
    userObj[name] = value
    setUserObj(userObj)
    console.log(userObj)
  }

  const registerUser = () => {
    const URL = `${global.APP_URL}/user`

    try {
      axios
        .post(URL, userObj)
        .then(response => {
          if (response.status === 200) {
            console.log('Success')
          } else {
            console.log('Failed')
          }
        })
        .catch(e => console.log(e))
    } catch {
      e => console.log(e)
    }
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
            height: screenHeight / 1.4,
            width: '90%',
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
            // Layout.justifyContentBetween,
          ]}
        >
          <View
            style={[
              // Layout.justifyContentBetween,
              { height: screenHeight },
            ]}
          >
            <View
              style={[
                [
                  Layout.colHCenter,
                  Gutters.regularHPadding,
                  Gutters.smallVPadding,
                ],
              ]}
            >
              {(isLoading || isFetching) && <ActivityIndicator />}
              {!isSuccess ? (
                <View>
                  <Text style={[Fonts.titleSmall]}>Sign Up</Text>
                  <Text style={[Fonts.textSmall, { fontWeight: '300' }]}>
                    Create new account
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={[Fonts.titleSmall]}>Sign Up</Text>
                  <Text style={[Fonts.textSmall, { fontWeight: '300' }]}>
                    Create new account
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
              <InputField
                placeholder="Name"
                label="Full Name"
                name="fullName"
                onChangeText={textFieldOnChange}
              />
              <View style={{ height: 15 }} />
              <InputField
                placeholder="Enter Email"
                label="Email Address"
                name="email"
                onChangeText={textFieldOnChange}
              />
              {/* <View style={{ height: 15 }} />
              <InputField
                placeholder="Username"
                label="Username"
                name="userName"
                onChangeText={textFieldOnChange}
              /> */}
              <View style={{ height: 15 }} />
              <InputField
                placeholder="DOB"
                label="Birth Date"
                name="dob"
                onChangeText={textFieldOnChange}
              />
              <View style={{ height: 15 }} />
              <View style={[Layout.row, Layout.rowHCenter]}>
                <View style={[Layout.fill]}>
                  <InputField
                    placeholder="City, Country"
                    label="City"
                    name="city"
                    onChangeText={textFieldOnChange}
                  />
                </View>
                <View style={{ width: 15 }} />
                <View style={[Layout.fill]}>
                  <InputField
                    placeholder="Street name"
                    label="Address"
                    name="address1"
                    onChangeText={textFieldOnChange}
                  />
                </View>
              </View>
              <View style={{ height: 15 }} />
              <View style={[Layout.row, Layout.rowHCenter]}>
                <View style={[Layout.fill]}>
                  <InputField
                    placeholder="State"
                    label="Province"
                    name="state"
                    onChangeText={textFieldOnChange}
                  />
                </View>
                <View style={{ width: 15 }} />
                <View style={[Layout.fill]}>
                  <InputField
                    placeholder="Zip code"
                    label="Zip"
                    name="zip"
                    onChangeText={textFieldOnChange}
                  />
                </View>
              </View>
              <View style={{ height: 15 }} />
              <InputField
                placeholder="Enter Password"
                label="Password"
                name="password"
                secureTextEntry={true}
                onChangeText={textFieldOnChange}
              />
              <View style={{ height: 15 }} />
            </View>

            <TouchableOpacity
              style={[Common.button.rounded, Gutters.regularBMargin]}
              onPress={() => {
                registerUser()
                Alert.alert("User Created")
              }}
            >
              <Text
                style={[
                  Fonts.textRegular,
                  { color: darkMode ? Colors.white : Colors.white },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>

            <View style={(Layout.row, Layout.rowCenter)}>
              <Text style={[Fonts.textSmall]}>Already a member?</Text>
              <View style={{ width: 5 }} />
              <TouchableOpacity
                onPress={() => navigateAndSimpleReset('AuthScreenLogin')}
              >
                <Text style={[Fonts.textPrimarySmall, Fonts.textRight]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* </ImageBackground> */}
    </View>
  )
}

export default SignUpAuthentication
