import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { ArrowDownTrayIcon, Bars3CenterLeftIcon, BellIcon } from 'react-native-heroicons/solid'
import { theme } from '../theme';
import GradientButton from '../components/Home/gradientButton'
import PaymentBottomBar from '../components/Home/paymentBottomBar'
import { useNavigation } from '@react-navigation/native'





const categories = ['Repairing', 'Inspection', 'New Installation'];
const Payments = [
    {
        paymentId: 1,
        paymentName: 'Payment 1',
        paymentStatus: 'Pending',
        paymentType:"Repairing",
        paymentPrice: 100,
        paymentDate: '2023-09-24',
        image: require('../assets/images/b2.png'),
    },
    {
        paymentId: 2,
        paymentName: 'Payment 2',
        paymentStatus: 'Processed',
        paymentType:"Inspection",
        paymentPrice: 200,
        paymentDate: '2023-09-23',
        image: require('../assets/images/b1.png'),
    },
    {
        paymentId: 3,
        paymentName: 'Payment 3',
        paymentStatus: 'Pending',
        paymentType:"New Installation",
        paymentPrice: 150,
        paymentDate: '2023-09-22',
        image: require('../assets/images/b5.png'),
    },
    {
        paymentId: 4,
        paymentName: 'Payment 4',
        paymentStatus: 'Processed',
        paymentType:"Inspection",
        paymentPrice: 300,
        paymentDate: '2023-09-21',
        image: require('../assets/images/b3.png'),
    },
    {
        paymentId: 5,
        paymentName: 'Payment 5',
        paymentStatus: 'Pending',
        paymentType:"Repairing",
        paymentPrice: 120,
        paymentDate: '2023-09-20',
        image: require('../assets/images/b7.png'),
    },
    // Add more payment objects as needed
];


export default function Payment() {
    const [activeCategory, setActiveCategory] = useState('Repairing');
    const [selectedGame, setSelectedGame] = useState(null);
    const [activeSort, setActiveSort] = useState('All');

    const [filteredPayments, setFilteredPayments] = useState([]);

    const navigation = useNavigation();

    const handleDetailsClick = (payment) => {
        console.log(payment)
        navigation.navigate('MyPaymentDetail', payment ); // Pass the selected Payment data as a parameter
    };

    // Filter Payment data based on the active category

    React.useEffect(() => {
        if (activeSort === 'All') {
            setFilteredPayments(Payments.filter((Payment) => Payment.paymentType === activeCategory))
        }
        else {
            let PaymentCachePerCategory = Payments.filter((Payment) => Payment.paymentType === activeCategory);
            let PaymentCachePerStatus = PaymentCachePerCategory.filter((Payment) => Payment.paymentStatus === activeSort);
            setFilteredPayments(PaymentCachePerStatus)

        }
    }, [activeSort, activeCategory])


    return (
        <LinearGradient
            colors={['rgba(255, 255, 244,0.4)', 'rgba(255, 255, 211, 0.4)']}
            className="w-full flex-1"
        >
            <SafeAreaView>
                <View className="container">


                    {/* categories */}
                    <View className="mt-3 space-y-4">
                        <Text
                            style={{ color: theme.text }}
                            className="ml-4 text-3xl font-bold"
                        >
                            Your Payments
                        </Text>
                        <View className="pl-4">
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {
                                    categories.map(cat => {
                                        if (cat == activeCategory) {
                                            // show gradient category
                                            return (
                                                <GradientButton key={cat} containerClass="mr-2" value={cat} />
                                            )
                                        } else {
                                            // show normal category
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => setActiveCategory(cat)}
                                                    key={cat}
                                                    className="bg-blue-200 p-3 px-4 rounded-full mr-2">
                                                    <Text>
                                                        {cat}
                                                    </Text>
                                                </TouchableOpacity>

                                            )
                                        }

                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>



                    {/* top action games list */}
                    <View className="mt-3">
                        <View className="flex-row justify-between items-center mb-2">
                            <Text
                                style={{ color: theme.text }}
                                className="ml-4 text-lg font-bold">
                                Your Results
                            </Text>
                        </View>
                        <ScrollView style={{ height: 520 }} showsVerticalScrollIndicator={false}>
                            {
                                filteredPayments.map((game, index) => {
                                    let bg = game.paymentId == selectedGame ? 'rgba(255,255,255,0.4)' : 'transparent';

                                    return (
                                        <TouchableOpacity
                                            style={{ backgroundColor: bg }}
                                            className="mx-4 p-2 mb-2 flex-row rounded-3xl"
                                            onPress={() => {
                                                setSelectedGame(game.paymentId)
                                                handleDetailsClick(game)
                                            }}
                                            key={index}>
                                            <Image source={game.image} style={{ width: 80, height: 80 }}
                                                className="rounded-2xl" />
                                            <View className="flex-1 flex justify-center pl-3 space-y-3">
                                                <Text style={{ color: theme.text }}
                                                    className="font-semibold">
                                                    {game.paymentId}
                                                </Text>
                                                <View className="flex-row space-x-3">
                                                    <View className="flex-row space-x-1">

                                                        <Text className="text-xs text-gray-700">
                                                            {game.paymentStatus}
                                                        </Text>
                                                    </View>
                                                    <View className="flex-row space-x-1">

                                                        <Text className="text-xs text-gray-700">
                                                            {game.paymentDate}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                          
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

            </SafeAreaView>
            <View>
                <PaymentBottomBar activeSort={activeSort} setActiveSort={setActiveSort} />
            </View>
        </LinearGradient>

    )
}