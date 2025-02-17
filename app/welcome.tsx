import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomeScreen = () => {
  return (
    <SafeAreaView className='flex-1 items-center bg-pink-500'>
      <View className='h-3/5 w-full bg-gray-400'>
        {/* { Marquee Component} */}
      </View>

      <View className='bg-blue-700 gap-4 p-4 w-full flex-1 justify-center'>
        <Text className='text-white/60 bg-red-500 text-center text-2xl font-bold'>
          Welcome to
        </Text>
        <Text className='text-5xl font-bold text-white bg-pink-600 text-center'>
          notJust Invites
        </Text>
        <Text className='text-lg  text-white/60 bg-green-500 text-center mb-5'>
          Create beautifull invitations for your events. Anyone can recive
          invitations. Create beautifull invitations for your events. Anyone can
          recive invitations.
        </Text>

        <Pressable className='bg-white py-4 px-10 rounded-full items-center self-center'>
          <Text className='text-lg'>Create an event</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
export default WelcomeScreen
