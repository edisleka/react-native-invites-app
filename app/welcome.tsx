import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { useState } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const events = [
  { id: 1, image: require('../assets/images/1.jpg') },
  { id: 2, image: require('../assets/images/2.jpg') },
  { id: 3, image: require('../assets/images/3.jpg') },
  { id: 4, image: require('../assets/images/4.jpg') },
  { id: 5, image: require('../assets/images/5.jpg') },
  { id: 6, image: require('../assets/images/6.jpg') },
  { id: 7, image: require('../assets/images/7.jpg') },
]

const WelcomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onButtonPress = () => {
    setActiveIndex(activeIndex >= events.length - 1 ? 0 : activeIndex + 1)
  }

  return (
    <View className='flex-1 items-center bg-pink-500'>
      {/* Animated Image with FadeIn and FadeOut */}
      <Animated.Image
        key={events[activeIndex].image}
        source={events[activeIndex].image}
        className='absolute top-0 left-0 w-full h-full'
        resizeMode='cover'
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
      />

      {/* BlurView */}
      <BlurView
        intensity={90}
        tint='dark'
        className='absolute top-0 bottom-0 left-0 right-0'
        experimentalBlurMethod='dimezisBlurView'
      />

      <SafeAreaView>
        <View className='h-3/5 w-full'>
          <ScrollView horizontal>
            {events.map((event) => (
              <View className='h-full w-96 p-5 shadow-2xl' key={event.id}>
                <Image
                  source={event.image}
                  className='w-full h-full rounded-3xl'
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View className='gap-4 p-4 w-full flex-1 justify-center'>
          <Text className='text-white/60 text-center text-2xl font-bold'>
            Welcome to
          </Text>
          <Text className='text-5xl font-bold text-white text-center'>
            notJust Invites
          </Text>
          <Text className='text-lg text-white/60 text-center mb-5'>
            Create beautiful invitations for your events. Anyone can receive
            invitations.
          </Text>

          <Pressable
            onPress={onButtonPress}
            className='bg-white py-4 px-10 rounded-full items-center self-center'
          >
            <Text className='text-lg'>Create an event</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default WelcomeScreen
