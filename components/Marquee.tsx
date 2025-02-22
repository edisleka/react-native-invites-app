import { View, useWindowDimensions } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  useFrameCallback,
  withTiming,
  Easing,
  interpolate,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { useEffect, useState, PropsWithChildren } from 'react'

interface MarqueeItemProps {
  index: number
  scroll: SharedValue<number>
  containerWidth: number
  itemWidth: number
}

const MarqueeItem = ({
  index,
  scroll,
  containerWidth,
  itemWidth,
  children,
}: PropsWithChildren<MarqueeItemProps>) => {
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
      {children}
      {/* <Image source={item.image} className='w-full h-full rounded-3xl' /> */}
    </Animated.View>
  )
}

const Marquee = ({
  items,
  onIndexChange,
  renderItem,
}: {
  items: any[]
  onIndexChange?: (index: number) => void
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactNode
}) => {
  const scroll = useSharedValue(0)
  const scrollSpeed = useSharedValue(50) // px per frame
  const { width: screenWidth } = useWindowDimensions()
  const [activeIndex, setActiveIndex] = useState(0)
  const itemWidth = screenWidth * 0.65
  const containerWidth = items.length * itemWidth

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(activeIndex)
    }
  }, [activeIndex])

  useAnimatedReaction(
    () => scroll.value,
    (value) => {
      const normalisedScroll = (value + screenWidth / 2) % containerWidth
      const activeIndex = Math.floor(normalisedScroll / itemWidth)
      runOnJS(setActiveIndex)(activeIndex)
    }
  )

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
        {items.map((item, index) => (
          <MarqueeItem
            key={item?.id}
            index={index}
            scroll={scroll}
            containerWidth={containerWidth}
            itemWidth={itemWidth}
          >
            {renderItem({ item, index })}
          </MarqueeItem>
        ))}
      </View>
    </GestureDetector>
  )
}

export default Marquee
