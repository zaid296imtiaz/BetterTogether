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

const Leaderboards = () => {
  const { Common, Fonts, Gutters, Layout, darkMode } = useTheme()

  return (
    <ScrollView>
      <Header
        backgroundColor="#fff"
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          iconStyle: [Common.primaryColor],
        }}
        centerComponent={{ text: 'Leaderboards', style: [Common.primaryColor] }}
        rightComponent={{
          icon: 'more-vert',
          color: '#fff',
          iconStyle: [Common.primaryColor],
        }}
      />

      <View style={[Gutters.regularHMargin, Gutters.regularVPadding]}>
        <Text style={[Fonts.titleSmall]}>Top Users</Text>
      </View>

      <View
        style={[
          Gutters.smallVPadding,
          Gutters.smallHPadding,
          { borderRadius: 10, backgroundColor: '#fff' },
        ]}
      >
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallVPadding,
            Gutters.smallHPadding,
            { borderRadius: 10, backgroundColor: '#fff' },
          ]}
        >
          <Text style={[Fonts.titleSmall]}>1.</Text>
          <View style={{ width: 10 }} />
          <Avatar size={48} rounded source={events[0].avatar} />
          <View style={{ width: 10 }} />
          <Text style={[Fonts.textRegular]}>{events[0].username}</Text>
          <Text style={[Fonts.textPrimarySmall, {marginLeft: 'auto'}]}>1000 Points</Text>
        </View>
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallVPadding,
            Gutters.smallHPadding,
            { borderRadius: 10, backgroundColor: '#fff' },
          ]}
        >
          <Text style={[Fonts.titleSmall]}>2.</Text>
          <View style={{ width: 10 }} />
          <Avatar size={48} rounded source={events[1].avatar} />
          <View style={{ width: 10 }} />
          <Text style={[Fonts.textRegular]}>{events[1].username}</Text>
          <Text style={[Fonts.textPrimarySmall, {marginLeft: 'auto'}]}>800 Points</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default Leaderboards
