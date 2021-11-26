import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './Translations'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  // global.APP_URL = 'http://127.0.0.1:8000/api'
  global.APP_URL = 'http://192.168.100.103:8000/api'
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App
