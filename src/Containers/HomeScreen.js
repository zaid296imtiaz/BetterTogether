import React, { Component, useState } from 'react'
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
} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { navigate } from '@/Navigators/utils'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const events = [
  {
    username: 'Brynn Adams',
    avatar: require('../Assets/Images/avatar1.jpg'),
    eventImage: require('../Assets/Images/city.jpg'),
    title: 'Plant a Tree',
    location: 'London, Ontario',
    date: '20 Dec 2021',
    time: '11 PM',
    description:
      'This event is open for all volunteers. Please participate in cleaning city',
  },
  {
    username: 'Elssa Woods',
    avatar: require('../Assets/Images/avatar2.jpg'),
    eventImage: require('../Assets/Images/trash.jpg'),
    title: 'Clean City',
    location: 'Windsor, Ontario',
    date: '24 Dec 2021',
    time: '12 PM',
    description:
      'This event is open for all volunteers. Please participate in cleaning city',
  },
]

const HomeScreen = () => {
  const { Common, Fonts, Gutters, Layout, darkMode } = useTheme()

  const [SearchItem, setSearchItem] = useState('')

  return (
    <View>
      {/* HEADER */}
      <Header
        backgroundColor="#fff"
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          iconStyle: [Common.primaryColor],
        }}
        centerComponent={{ text: 'Home', style: [Common.primaryColor] }}
        rightComponent={{
          icon: 'bar-chart',
          color: '#fff',
          iconStyle: [Common.primaryColor],
          onPress: () => navigate('Leaderboards')
        }}
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
              onPress={() => {navigate('EventDetails')}}
            >
              <Card
                containerStyle={{ borderRadius: 10, padding: 0 }}
                wrapperStyle={{ borderRadius: 10, overflow: 'hidden' }}
              >
                {/* <Card.Title>CARD WITH DIVIDER</Card.Title> */}
                <Image
                  style={{ height: 200, width: '100%', borderRadius: 10 }}
                  resizeMode="cover"
                  source={item.eventImage}
                />
                <View
                  style={[Gutters.regularHPadding, Gutters.regularVPadding]}
                >
                  <View style={(Layout.row, Layout.rowHCenter)}>
                    <Avatar size={48} rounded source={item.avatar} />
                    <View style={[Gutters.regularHMargin]}>
                      <Text
                        style={[
                          Fonts.textRegular,
                          { fontWeight: '600', marginLeft: 5 },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <View style={[Layout.row, Layout.rowHCenter]}>
                        <Icon name="location-pin" size={18} />
                        <Text style={[Fonts.textSmall]}>{item.location}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[Gutters.regularVMargin]}>
                    <Text style={[Fonts.textSmall, { color: 'grey' }]}>
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={[Layout.row, Layout.rowHCenter, Layout.rowVCenter]}
                  >
                    <Icon name="access-time" size={18} />
                    <View style={{ width: 5 }} />
                    <Text style={[Fonts.textPrimarySmall]}>
                      {item.date + ' at ' + item.time}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
          <View style={{ height: 15 }} />
        </ScrollView>
      </View>
    </View>
  )
}

export default HomeScreen
