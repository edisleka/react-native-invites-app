import { View, ScrollView, Image } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  useFrameCallback,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'

const itemWidth = 250

interface MarqueeItemProps {
  event: any
  index: number
  scroll: SharedValue<number>
}

const MarqueeItem = ({ event, index, scroll }: MarqueeItemProps) => {
  const initialPosition = itemWidth * index

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: initialPosition - scroll.value,
    }
  })

  return (
    <Animated.View
      className='absolute h-full w-96 p-5 shadow-md'
      style={[{ width: itemWidth }, animatedStyle]}
    >
      <Image source={event.image} className='w-full h-full rounded-3xl' />
    </Animated.View>
  )
}

const Marquee = ({ events }: { events: any[] }) => {
  const scroll = useSharedValue(0)
  const scrollSpeed = useSharedValue(50) // px per frame

  useFrameCallback((frameInfo) => {
    const deltaSeconds = (frameInfo.timeSincePreviousFrame ?? 0) / 1000
    scroll.value = scroll.value + scrollSpeed.value * deltaSeconds
  })

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scrollSpeed.value = 0
    })
    .onChange((event) => {
      scroll.value = scroll.value - event.changeX
    })
    .onFinalize((event) => {
      scrollSpeed.value = -event.velocityX
      scrollSpeed.value = withTiming(50, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      })
    })

  return (
    <GestureDetector gesture={gesture}>
      <View className='h-full flex-row'>
        {events.map((event, index) => (
          <MarqueeItem
            key={event.id}
            event={event}
            index={index}
            scroll={scroll}
          />
        ))}
      </View>
    </GestureDetector>
  )
}

export default Marquee
