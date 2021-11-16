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
import { InputField } from '@/Components'

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

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const EventDetails = () => {
  const { Common, Fonts, Gutters, Layout, darkMode, Colors } = useTheme()

  return (
    <ScrollView>
      <Header
        backgroundColor="#fff"
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          iconStyle: [Common.primaryColor],
        }}
        centerComponent={{ text: 'Event', style: [Common.primaryColor] }}
        rightComponent={{
          icon: 'more-vert',
          color: '#fff',
          iconStyle: [Common.primaryColor],
        }}
      />

      <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
        <Image
          source={events[0].eventImage}
          style={{ height: 300, width: '100%', borderRadius: 10 }}
        />
      </View>
      <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
        <Text style={[Fonts.titleSmall]}>{events[0].title}</Text>

        <View style={{ height: 5 }} />

        <View style={[Layout.row, Layout.rowHCenter]}>
          <Icon name="location-pin" size={18} />
          <Text style={[Fonts.textSmall]}>{events[0].location}</Text>
        </View>

        <View style={{ height: 5 }} />

        <View style={[Layout.row, Layout.rowHCenter]}>
          <Icon name="access-time" size={18} />
          <View style={{ width: 5 }} />
          <Text style={[Fonts.textSmall]}>
            {events[0].date + ' at ' + events[0].time}
          </Text>
        </View>

        <View style={[Gutters.regularVMargin]}>
          <Text style={[Fonts.textRegular, { color: 'grey' }]}>
            {events[0].description}
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
              { borderRadius: 10, backgroundColor: '#fff' },
            ]}
          >
            <Avatar size={48} rounded source={events[0].avatar} />
            <View style={{ width: 10 }} />
            <Text style={[Fonts.textRegular]}>{events[0].username}</Text>
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
                { borderRadius: 10, backgroundColor: '#fff' },
              ]}
            >
              <InputField placeholder="Comment" label="Post a Comment" />
              <View style={{ height: 15 }} />
              <View style={[Layout.row, Layout.rowHCenter]}>
                <Avatar rounded source={events[1].avatar} />
                <View style={{ width: 10 }} />
                <Text style={[Fonts.textSmall]}>{events[1].username}</Text>
              </View>
              <View style={{ marginLeft: 45 }}>
                <Text style={[Fonts.textRegular, { color: '#313131' }]}>
                  Very Nice Event! Will participate surely.
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 20 }} />
          <TouchableOpacity
            style={[Common.button.rounded, Gutters.regularBMargin]}
            onPress={() => {}}
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
