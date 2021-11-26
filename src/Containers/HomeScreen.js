import React, { Component, useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
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
  FAB,
} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { navigate } from '@/Navigators/utils'
import axios from 'axios'
import moment from 'moment'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

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

const imagesEv = [require('../Assets/Images/1.jpeg'), require('../Assets/Images/2.jpeg')]
const imagesAv = [
  require('../Assets/Images/avatar1.jpg'),
  require('../Assets/Images/user2.jpg'),
]

const HomeScreen = () => {
  const { Common, Fonts, Gutters, Layout, darkMode } = useTheme()

  const [SearchItem, setSearchItem] = useState('')
  const [events, setEvents] = useState([])

  useEffect(() => {
    console.log(`${global.APP_URL}/event`)
    const URL = `${global.APP_URL}/event`

    try {
      axios
        .get(URL)
        .then(response => {
          if (response.status === 200) {
            setEvents(response.data)
            console.log(response.data)
          } else {
            console.log('Error occured')
          }
        })
        .catch(e => console.log(e))
    } catch {
      e => console.log(e)
    }

    // return () => {
    //   cleanup
    // }
  }, [])

  return (
    <View>
      {/* HEADER */}
      <Header
        backgroundColor={darkMode ? '#000' : '#fff'}
        leftComponent={{
          icon: 'bar-chart',
          color: '#fff',
          iconStyle: [Common.primaryColor],
          onPress: () => navigate('Leaderboards'),
        }}
        centerComponent={{ text: 'Home', style: [Common.primaryColor] }}
        rightComponent={{
          icon: 'logout',
          color: '#fff',
          iconStyle: [Common.primaryColor],
          onPress: () => navigate('AuthScreenLogin'),
        }}
      />
      <FAB
        visible={true}
        style={{ zIndex: 10 }}
        color="#078A7C"
        placement="right"
        title="New Event"
        onPress={() => navigate('CreateEvent')}
        icon={{ name: 'add', color: 'white' }}
      />
      <View style={{ height: screenHeight - 69 }}>
        <ScrollView>
          {/* SEARCH BAR */}
          <SearchBar
            placeholder="Type Here..."
            onChangeText={s => setSearchItem(s)}
            value={SearchItem}
            lightTheme={!darkMode}
          />

          {/* CARDS */}
          {events.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => {
                navigate('EventDetails', { id: item.id, ind: index })
              }}
            >
              <Card
                containerStyle={[
                  {
                    borderRadius: 10,
                    padding: 0,
                    borderWidth: 0,
                    backgroundColor: darkMode
                      ? 'rgba(60,60,60,0.8)'
                      : 'rgba(255,255,255,0.9)',
                  },
                ]}
                wrapperStyle={{ borderRadius: 10, overflow: 'hidden' }}
              >
                {/* <Card.Title>CARD WITH DIVIDER</Card.Title> */}
                <Image
                  style={{ height: 200, width: '100%', borderRadius: 10 }}
                  resizeMode="cover"
                  source={imagesEv[index]}
                />
                <View
                  style={[Gutters.regularHPadding, Gutters.regularVPadding]}
                >
                  <View style={(Layout.row, Layout.rowHCenter)}>
                    <Avatar
                      size={48}
                      rounded
                      source={item.user_id === 1 ? imagesAv[0] : imagesAv[1]}
                    />
                    <View style={[Gutters.regularHMargin]}>
                      <Text
                        style={[
                          Fonts.textRegular,
                          { fontWeight: '600', marginLeft: 5 },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <View style={[Layout.row, Layout.rowHCenter]}>
                        <Icon
                          name="location-pin"
                          size={18}
                          color={darkMode ? '#909090' : '#000'}
                        />
                        <Text style={[Fonts.textSmall]}>{item.city}</Text>
                        <Text style={[Fonts.textSmall]}>, </Text>
                        <Text style={[Fonts.textSmall]}>{item.state}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[Gutters.regularVMargin]}>
                    <Text
                      style={[
                        Fonts.textSmall,
                        { color: darkMode ? '#aaa' : 'grey' },
                      ]}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={[Layout.row, Layout.rowHCenter, Layout.rowVCenter]}
                  >
                    <Icon
                      name="access-time"
                      size={18}
                      color={darkMode ? '#909090' : '#000'}
                    />
                    <View style={{ width: 5 }} />
                    <Text style={[Fonts.textPrimarySmall]}>
                      {moment(item.eventDate).format('DD-MM-YYYY, hh:mm a')}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
          <View style={{ height: 80 }} />
        </ScrollView>
      </View>
    </View>
  )
}

export default HomeScreen
