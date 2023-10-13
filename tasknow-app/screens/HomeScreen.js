import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Home/categories';
import SortCategories from '../components/Home/sortCategories';
import Services from '../components/Home/services';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
const ios = Platform.OS=='ios';
const topMargin = ios? 'mt-3': 'mt-10';


export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient
    colors={['rgba(255, 255, 244,0.4)', 'rgba(255, 255, 211, 0.4)']}
    className="w-full flex-1"
>
    <SafeAreaView className="flex-1">
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text style={{fontSize: wp(7)}} className="font-bold text-neutral-700">TaskeNow</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Landing')}>
            <Image source={require('../assets/images/logout.png')} style={{height: wp(12), width: wp(12)}} />
          </TouchableOpacity>
        </View>

        {/* search bar */}
        <View className="mx-5 mb-4">
          <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder='Search Jobs'
              placeholderTextColor={'gray'}
              className="flex-1 text-base mb-1 pl-1 tracking-wider"
            />
          </View>
        </View>

        {/* categories */}
        <View className="mb-4">
          <Categories />
        </View>
      <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6 "+topMargin}>
        {/* avatar */}
      

       

        {/* destinations */}
        <View>
          <Services />
        </View>

         {/* sort categories */}
      
      </ScrollView>
      <View className="mb-4">
          <SortCategories />
        </View>
    </SafeAreaView>
    </LinearGradient>
  )
}