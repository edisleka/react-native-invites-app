import { View, Text, StyleSheet, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'

const Create = () => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')

  return (
    <View className='flex-1'>
      <LinearGradient
        colors={['#FF0000', '#800080', '#00008B']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView className='p-4'>
        {/* Header */}
        <View className='flex-row justify-between items-center'>
          <Ionicons
            onPress={() => router.back()}
            name='close'
            size={24}
            color='white'
            className='bg-zinc-700/30 rounded-full p-2'
          />
          <Pressable className='rounded-full bg-white px-6 p-3'>
            <Text className='text-zinc-900 font-bold'>Preview</Text>
          </Pressable>
        </View>

        {/* Image Picker for background */}
        <View className='h-1/2 w-full items-center justify-center gap-4'>
          <Ionicons name='image' size={42} color='rgba(255,255,255,0.5)' />
          <Pressable className='rounded-full bg-black/10 px-6 p-3'>
            <Text className='text-white/90 font-bold'>Add background</Text>
          </Pressable>
        </View>

        {/* Event inputs */}
        <BlurView
          intensity={10}
          className=' w-full rounded-3xl gap-4 overflow-hidden border border-white/15'
        >
          <View className=' bg-black/30'>
            <View className='border-b border-white/15 p-4 py-8'>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder='Event title'
                placeholderTextColor='rgba(255,255,255,0.5)'
                className=' text-center text-4xl font-bold text-white/90'
              />
            </View>
            <View className='border-b border-white/15 p-4 items-center gap-4'>
              <Ionicons
                name='calendar'
                size={24}
                color='rgba(255,255,255,0.8)'
              />
              <Text className='font-medium text-white/80'>Date and Time</Text>
            </View>
            <View className='border-b border-white/15 p-4 items-center gap-4'>
              <Ionicons name='pin' size={24} color='rgba(255,255,255,0.8)' />
              <Text className='font-medium text-white/80'>Location</Text>
            </View>
          </View>
        </BlurView>
      </SafeAreaView>
    </View>
  )
}
export default Create
