import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function Landing() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: "#fff"}}>
        <View className="flex-1 flex justify-around my-4">
            <Text 
                className="text-black font-bold text-4xl text-center">
              TakseNow Tech
            </Text>
            <View className="flex-row justify-center">
                <Image source={require("../../assets/images/Landing.jpg")}
                    style={{width: 350, height: 350}} />
            </View>
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Onboarding')}
                    className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text 
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-black font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-400"> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}