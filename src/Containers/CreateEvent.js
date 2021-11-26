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
  Linking,
  Button,
  Alert,
} from 'react-native'
import {
  Header,
  SearchBar,
  Card,
  ListItem,
  //   Button,
  Icon,
  Avatar,
  FAB,
} from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { Colors } from '@/Theme/Variables'
import { InputField } from '@/Components'
import { navigate } from '@/Navigators/utils'
import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const CreateEvent = () => {
  const { Common, Fonts, Gutters, Layout, darkMode } = useTheme()

  const [date, setDate] = useState(new Date(1598051730000))
  const [time, setTime] = useState(new Date(1598051730000))
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const [eventObj, setEventObj] = useState({
    address1: '',
    address2: 'asd',
    city: '',
    eventDate: date.toString(),
    description: '',
    name: '',
    state: '',
    user_id: 1,
    zip: '',
    longitude: '',
    latitude: '',
  })

  const textFieldOnChange = (value, name) => {
    eventObj[name] = value
    setEventObj(eventObj)
    console.log(eventObj)
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
    setTime()
  }

  const showMode = currentMode => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  const createEvent = () => {
    const URL = `${global.APP_URL}/event`

    try {
      axios
        .post(URL, eventObj)
        .then(resposne => {
          if (resposne.status === 200) {
            Alert.alert('Event Created')
            navigate('HomeScreen')
          }
        })
        .catch(e => console.log(e))
    } catch {
      e => console.log(e)
    }
  }

  return (
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
      <Header
        backgroundColor={darkMode ? '#000' : '#fff'}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          iconStyle: [Common.primaryColor],
          onPress: () => navigate('HomeScreen'),
        }}
        centerComponent={{ text: 'New Event', style: [Common.primaryColor] }}
        // rightComponent={{
        //   icon: 'more-vert',
        //   color: '#fff',
        //   iconStyle: [Common.primaryColor],
        // }}
      />
      <View
        style={[
          // Layout.justifyContentBetween,
          { height: screenHeight },
        ]}
      >
        <View
          style={[
            [Layout.colHCenter, Gutters.regularHPadding, Gutters.smallVPadding],
          ]}
        >
          {/* {(isLoading || isFetching) && <ActivityIndicator />}
          {!isSuccess ? (
            <View>
              <Text style={[Fonts.titleSmall]}>Sign Up</Text>
              <Text style={[Fonts.textSmall, { fontWeight: '300' }]}>
                Create new account
              </Text>
            </View>
          ) : ( */}
          <View>
            <Text style={[Fonts.titleSmall]}>Event Creator</Text>
            <Text style={[Fonts.textSmall, { fontWeight: '300' }]}>
              Create new Event
            </Text>
          </View>
          {/* )} */}
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
            label="Event Name"
            name="name"
            onChangeText={textFieldOnChange}
          />
          <View style={{ height: 15 }} />
          <InputField
            placeholder="Brief description"
            label="Description"
            name="description"
            onChangeText={textFieldOnChange}
          />
          <View style={{ height: 15 }} />
          <Text style={[Fonts.textSmall]}>Date</Text>
          <View style={{ height: 10 }} />
          <View>
            <TouchableOpacity
              onPress={showDatepicker}
              style={[
                Common.button.rounded,
                Gutters.regularBMargin,
                {
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: '#aaa',
                  // height: 10,
                  borderRadius: 10,
                },
              ]}
            >
              <Text
                style={[
                  Fonts.textRegular,
                  { color: darkMode ? Colors.white : Colors.white },
                ]}
              >
                {date.toDateString()}
              </Text>
            </TouchableOpacity>
            <View style={{ width: 5 }} />
            <InputField
              placeholder="7:30 am"
              label="Time"
              name="time"
              onChangeText={textFieldOnChange}
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          {/* <View style={{ height: 15 }} />
          <InputField
            placeholder="DOB"
            label="Birth Date"
            name="dob"
            onChangeText={textFieldOnChange}
          /> */}
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
          <View style={[Layout.row, Layout.rowHCenter]}>
            <View style={[Layout.fill]}>
              <InputField
                placeholder="Latitude"
                label="Event Latitude"
                name="latitude"
                onChangeText={textFieldOnChange}
              />
            </View>
            <View style={{ width: 15 }} />
            <View style={[Layout.fill]}>
              <InputField
                placeholder="Longitude"
                label="Event Longitude"
                name="longitude"
                onChangeText={textFieldOnChange}
              />
            </View>
          </View>
          <View style={{ height: 15 }} />
        </View>

        <TouchableOpacity
          style={[Common.button.rounded, Gutters.regularBMargin]}
          onPress={() => {
            createEvent()
            // console.log(eventObj)
            Alert.alert("Event Created")
          }}
        >
          <Text
            style={[
              Fonts.textRegular,
              { color: darkMode ? Colors.white : Colors.white },
            ]}
          >
            Create
          </Text>
        </TouchableOpacity>

        {/* <View style={(Layout.row, Layout.rowCenter)}>
          <Text style={[Fonts.textSmall]}>Already a member?</Text>
          <View style={{ width: 5 }} />
          <TouchableOpacity
            onPress={() => navigateAndSimpleReset('AuthScreenLogin')}
          >
            <Text style={[Fonts.textPrimarySmall, Fonts.textRight]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  )
}

export default CreateEvent
