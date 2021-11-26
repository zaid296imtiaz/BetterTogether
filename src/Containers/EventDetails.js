import React, { Component, useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  PermissionsAndroid,
  Linking,
  Alert,
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTheme } from '@/Hooks'

import {
  Header,
  SearchBar,
  Card,
  ListItem,
  Button,
  Icon,
  Avatar,
} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { navigate } from '@/Navigators/utils'
import { InputField } from '@/Components'

import axios from 'axios'
import moment from 'moment'
import Geolocation from 'react-native-geolocation-service'

// const events = [
//   {
//     username: 'Brynn Adams',
//     avatar: require('../Assets/Images/avatar1.jpg'),
//     eventImage: require('../Assets/Images/city.jpg'),
//     title: 'Plant a Tree',
//     location: 'London, Ontario',
//     date: '20 Dec 2021',
//     time: '11 PM',
//     description:
//       'This event is open for all volunteers. Please participate in cleaning city',
//   },
//   {
//     username: 'Elssa Woods',
//     avatar: require('../Assets/Images/avatar2.jpg'),
//     eventImage: require('../Assets/Images/trash.jpg'),
//     title: 'Clean City',
//     location: 'Windsor, Ontario',
//     date: '24 Dec 2021',
//     time: '12 PM',
//     description:
//       'This event is open for all volunteers. Please participate in cleaning city',
//   },
// ]

const imagesEv = [
  require('../Assets/Images/1.jpeg'),
  require('../Assets/Images/2.jpeg'),
]
const imagesAv = [
  require('../Assets/Images/avatar1.jpg'),
  require('../Assets/Images/user2.jpg'),
]

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const EventDetails = ({ route }) => {
  const { Common, Fonts, Gutters, Layout, darkMode, Colors } = useTheme()

  const [event, setEvent] = useState({})
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [createdByUser, setcreatedByUser] = useState({})

  useEffect(() => {
    // console.log(route.params.id)
    const URL = `${global.APP_URL}/event/${route.params.id}`

    try {
      axios
        .get(URL)
        .then(response => {
          if (response.status === 200) {
            setEvent(response.data)
            console.log(response.data)
            const userURL = `${global.APP_URL}/user/${response.data.user_id}`
            axios
              .get(userURL)
              .then(response => {
                if (response.status === 200) {
                  setcreatedByUser(response.data)
                  getComments()
                } else {
                  console.log('Error')
                }
              })
              .catch(e => console.log(e))
          } else {
            console.log('Error occured')
          }
        })
        .catch(e => console.log(e))
    } catch {
      e => console.log(e)
    }

    return () => {
      cleanup
    }
  }, [])

  const getComments = () => {
    axios
      .get(`${global.APP_URL}/comment/${route.params.id}`)
      .then(response => {
        if (response.status === 200) {
          setComments(response.data)
        }
      })
      .catch(e => console.log(e))
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Better Together',
          message: 'Grant access for location based services',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location')
        Geolocation.getCurrentPosition(
          position => {
            console.log(position)
            Linking.openURL(
              `app://bettertogether/${position.coords.latitude},${position.coords.longitude}_${event.latitude}, ${event.longitude}`,
            )
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
      } else {
        console.log('location permission denied')
        alert('Location permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const postComment = () => {
    const URL = `${global.APP_URL}/comment`

    const data = {
      event_id: route.params.id,
      user_id: 2,
      description: newComment,
    }

    try {
      axios
        .post(URL, data)
        .then(response => {
          if (response.status === 201) {
            console.log('Success')
            setNewComment('')
            getComments()
          }
        })
        .catch(e => console.log(e))
    } catch {
      e => console.log(e)
    }
  }

  return (
    <ScrollView>
      <Header
        backgroundColor={darkMode ? '#000' : '#fff'}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          iconStyle: [Common.primaryColor],
          onPress: () => navigate('HomeScreen'),
        }}
        centerComponent={{ text: 'Event', style: [Common.primaryColor] }}
        // rightComponent={{
        //   icon: 'more-vert',
        //   color: '#fff',
        //   iconStyle: [Common.primaryColor],
        // }}
      />

      <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
        <Image
          source={imagesEv[route.params.ind]}
          style={{ height: 300, width: '100%', borderRadius: 10 }}
        />
      </View>
      <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
        <Text style={[Fonts.titleSmall]}>{event.name}</Text>

        <View style={{ height: 5 }} />

        <View style={[Layout.row, Layout.rowHCenter]}>
          <View style={{ flex: 2 }}>
            <View style={[Layout.row, Layout.rowHCenter]}>
              <Icon
                name="location-pin"
                size={18}
                color={darkMode ? '#909090' : '#000'}
              />
              <Text style={[Fonts.textSmall]}>{event.city}</Text>
              <Text style={[Fonts.textSmall]}>, </Text>
              <Text style={[Fonts.textSmall]}>{event.state}</Text>
            </View>

            <View style={{ height: 5 }} />

            <View style={[Layout.row, Layout.rowHCenter]}>
              <Icon
                name="access-time"
                size={18}
                color={darkMode ? '#909090' : '#000'}
              />
              <View style={{ width: 5 }} />
              <Text style={[Fonts.textSmall]}>
                {moment(event.eventDate).format('DD-MM-YYYY, hh:mm a')}
              </Text>
            </View>
          </View>
          <View style={[Layout.rowHCenter]}>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.rowHCenter,
                Common.button.rounded,
                Gutters.regularBMargin,
                Common.backgroundPrimary,
                {
                  backgroundColor: 'rgba(7, 138, 124, 0.3)',
                  paddingHorizontal: 15,
                },
              ]}
              onPress={() => {
                requestLocationPermission()
              }}
            >
              <Icon name="3d-rotation" size={24} color={Colors.primary} />
              <View style={{ width: 5 }} />
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: darkMode ? Colors.primary : Colors.primary,
                    fontWeight: '700',
                  },
                ]}
              >
                AR Map
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[Gutters.regularVMargin]}>
          <Text
            style={[Fonts.textRegular, { color: darkMode ? '#aaa' : 'grey' }]}
          >
            {event.description}
          </Text>
        </View>

        <View style={{ height: 15 }} />

        <View>
          <Text style={[Fonts.textRegular, { fontWeight: '600' }]}>
            Created By
          </Text>
          <View style={{ height: 5 }} />
          <View
            style={[
              Layout.row,
              Layout.rowHCenter,
              Gutters.smallVPadding,
              Gutters.smallHPadding,
              {
                borderRadius: 10,
                backgroundColor: darkMode
                  ? 'rgba(60,60,60,0.8)'
                  : 'rgba(255,255,255,0.9)',
              },
            ]}
          >
            <Avatar
              size={48}
              rounded
              source={event.user_id === 1 ? imagesAv[0] : imagesAv[1]}
            />
            <View style={{ width: 10 }} />
            <Text style={[Fonts.textRegular]}>{createdByUser.name}</Text>
          </View>

          <View style={{ height: 15 }} />

          <View>
            <Text style={[Fonts.textRegular, { fontWeight: '600' }]}>
              Comments
            </Text>
            <View style={{ height: 5 }} />
            <View
              style={[
                Gutters.smallVPadding,
                Gutters.smallHPadding,
                {
                  borderRadius: 10,
                  backgroundColor: darkMode
                    ? 'rgba(60,60,60,0.8)'
                    : 'rgba(255,255,255,0.9)',
                },
              ]}
            >
              <InputField
                placeholder="Comment"
                label="Post a Comment"
                onChangeText={text => setNewComment(text)}
              />
              <View style={{ height: 10 }} />
              <TouchableOpacity
                style={[
                  Common.button.rounded,
                  Gutters.regularBMargin,
                  { width: 100, marginLeft: 'auto' },
                ]}
                onPress={() => {
                  postComment()
                }}
              >
                <Text
                  style={[
                    Fonts.textSmall,
                    { color: darkMode ? Colors.white : Colors.white },
                  ]}
                >
                  Post
                </Text>
              </TouchableOpacity>
              <View style={{ height: 15 }} />
              {comments.map((item, index) => (
                <View key={index}>
                  <View style={[Layout.row, Layout.rowHCenter]}>
                    <Avatar
                      rounded
                      source={item.user_id === 1 ? imagesAv[0] : imagesAv[1]}
                    />
                    <View style={{ width: 10 }} />
                    <Text style={[Fonts.textSmall]}>
                      {item.user_id === 1 ? 'Umar Amjad' : 'Zaid Imtiaz'}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 45 }}>
                    <Text
                      style={[
                        Fonts.textRegular,
                        { color: darkMode ? '#aaa' : '#313131' },
                      ]}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 20 }} />
          <TouchableOpacity
            style={[Common.button.rounded, Gutters.regularBMargin]}
            onPress={() => {
              Alert.alert(
                'Confirmation',
                'Do you want to participate in this event?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () =>
                      setTimeout(() => {
                        Alert.alert('You are now a participant')
                      }, 1000),
                  },
                ],
              )
            }}
          >
            <Text
              style={[
                Fonts.textRegular,
                { color: darkMode ? Colors.white : Colors.white },
              ]}
            >
              Participate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default EventDetails
