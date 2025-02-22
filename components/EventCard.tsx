import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, Image, StyleSheet } from 'react-native'
const EventCard = ({ event }: { event: any }) => {
  return (
    <View className='h-full w-full justify-end rounded-3xl overflow-hidden'>
      <Image source={event.image} className='h-full w-full absolute' />
      <BlurView intensity={20} className='h-24 w-full justify-center'>
        {/* <View className='h-full w-full bg-black/70 absolute' /> */}
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
        <Text className='text-white text-2xl text-center'>Birthday Party</Text>
      </BlurView>
    </View>
  )
}
export default EventCard
