import { Stack } from 'expo-router'
import './global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Platform } from 'react-native'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name='welcome'
          options={{
            headerShown: false,
            presentation: Platform.OS === 'ios' ? 'fullScreenModal' : 'modal',
          }}
        />
        <Stack.Screen
          name='create'
          options={{
            headerShown: false,
            presentation: Platform.OS === 'ios' ? 'fullScreenModal' : 'modal',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  )
}
