import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

export default function MyPaymentDetail(props) {
  let Payment = props.route.params;
  const navigation = useNavigation();

  return (
    <View className="flex-1" style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
        <View className="flex-row justify-start mx-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            className="border border-gray-50 rounded-xl"
          >
            <ChevronLeftIcon size="30" color="white" />
          </TouchableOpacity>
        </View>
        <View
          className="flex-row justify-center mt-5 pb-10"
          style={{
            shadowColor: 'gray',
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.7,
          }}
        >
          {/* <Image source={Payment.image} style={{ width: 290, height: 290 }} /> */}
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 45, borderTopRightRadius: 45 }}
        className="bg-orange-50 flex-1 px-6 space-y-2"
      >
        <Text
          style={{ color: theme.text }}
          className="mt-8 text-2xl font-bold"
        >
          Payment ID: {Payment.paymentId}
        </Text>
        <Text
          style={{ color: theme.text }}
          className="text-gray-500 font-semibold"
        >
          Payment Status: {Payment.paymentStatus}
        </Text>
        <Text
          style={{ color: theme.text }}
          className="text-gray-500 font-semibold"
        >
          Payment Date: {Payment.paymentDate}
        </Text>

    

        <View className="flex-row justify-between items-center">
          <Text className="text-3xl">Price: $ {Payment.paymentPrice}</Text>
        </View>
      </View>
    </View>
  );
}
