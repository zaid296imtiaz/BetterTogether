import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import LoginAuthentication from '@/Containers/LoginAuthentication'
import SignUpAuthentication from '@/Containers/SignUpAuthentication'
import HomeScreen from '@/Containers/HomeScreen'
import EventDetails from '@/Containers/EventDetails'
import Leaderboards from '@/Containers/Leaderboards'
import CreateEvent from '@/Containers/CreateEvent'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'light-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name="AuthScreenLogin"
            component={LoginAuthentication}
          />
          <Stack.Screen
            name="AuthScreenSignUp"
            component={SignUpAuthentication}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="EventDetails" component={EventDetails} />
          <Stack.Screen name="Leaderboards" component={Leaderboards} />
          <Stack.Screen name="CreateEvent" component={CreateEvent} />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
