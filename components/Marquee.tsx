import { View, ScrollView, Image, useWindowDimensions } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  useFrameCallback,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'

interface MarqueeItemProps {
  event: any
  index: number
  scroll: SharedValue<number>
  containerWidth: number
  itemWidth: number
}

const MarqueeItem = ({
  event,
  index,
  scroll,
  containerWidth,
  itemWidth,
}: MarqueeItemProps) => {
  // const initialPosition = itemWidth * index

  const { width: screenWidth } = useWindowDimensions()

  const shift = (containerWidth - screenWidth) / 2

  const initialPosition = itemWidth * index - shift

  const animatedStyle = useAnimatedStyle(() => {
    const position = ((initialPosition - scroll.value) % containerWidth) + shift

    const rotation = interpolate(
      position,
      [0, screenWidth - itemWidth],
      [-1, 1]
    )

    const translateY = interpolate(
      position,
      [0, (screenWidth - itemWidth) / 2, screenWidth - itemWidth],
      [3, 0, 3]
    )

    return {
      left: position,
      transform: [{ rotateZ: `${rotation}deg` }, { translateY }],
    }
  })

  return (
    <Animated.View
      className='absolute h-full w-96 p-2 '
      style={[{ width: itemWidth, transformOrigin: 'bottom' }, animatedStyle]}
    >
      <Image source={event.image} className='w-full h-full rounded-3xl' />
    </Animated.View>
  )
}

const Marquee = ({ events }: { events: any[] }) => {
  const scroll = useSharedValue(0)
  const scrollSpeed = useSharedValue(50) // px per frame
  const { width: screenWidth } = useWindowDimensions()

  const itemWidth = screenWidth * 0.65

  const containerWidth = events.length * itemWidth

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
            containerWidth={containerWidth}
            itemWidth={itemWidth}
          />
        ))}
      </View>
    </GestureDetector>
  )
}

export default Marquee
