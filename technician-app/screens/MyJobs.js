import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { ArrowDownTrayIcon, Bars3CenterLeftIcon, BellIcon } from 'react-native-heroicons/solid'
import { theme } from '../theme';
import GradientButton from '../components/Home/gradientButton'
import JobBottomBar from '../components/Home/jobBottomBar'
import { useNavigation } from '@react-navigation/native'
import { makeRequest } from '../data/api'
import { getData } from '../data/localData'





const categories = ['Repairing', 'Inspection', 'New Installation'];



export default function MyJobs() {
    const [activeCategory, setActiveCategory] = useState('Repairing');
    const [selectedGame, setSelectedGame] = useState(null);
    const [activeSort, setActiveSort] = useState('All');
    const [userId, setUserId] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [jobList, setJobList] = useState([]);
    const image = require('../assets/images/b1.png');

    const navigation = useNavigation();

    const handleDetailsClick = (job) => {
        console.log(job)
        navigation.navigate('MyJobDetail', job); // Pass the selected job data as a parameter
    };

    React.useEffect(()=>{
       async function getJob ()
       {
        const id = await getData("technicianProfile");
        console.log(id.techId)
        setUserId(id.techId);
        await makeRequest(`/api/job/tech/${id.techId}`, "get").then((res) => {
            console.log(res.data)
            setJobList(res.data)
        }).catch((err) => {
            console.log(err);
        })
       }

       getJob()
      },[])


    React.useEffect(() => {
    
        if (activeSort === 'All') {
            setFilteredJobs(jobList.filter((job) => job.jobType === activeCategory))
        }
        else {
            let jobCachePerCategory = jobList.filter((job) => job.jobType === activeCategory);
            let jobCachePerStatus = jobCachePerCategory.filter((job) => job.jobStatus === activeSort);
            setFilteredJobs(jobCachePerStatus)

        }
    }, [jobList,activeSort, activeCategory])


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
                            Browse Jobs
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
                                filteredJobs.map((game, index) => {
                                    let bg = game.jobId == selectedGame ? 'rgba(255,255,255,0.4)' : 'transparent';

                                    return (
                                        <TouchableOpacity
                                            style={{ backgroundColor: bg }}
                                            className="mx-4 p-2 mb-2 flex-row rounded-3xl"
                                            onPress={() => {
                                                setSelectedGame(game.jobId)
                                                handleDetailsClick(game)
                                            }}
                                            key={index}>
                                            <Image source={image} style={{ width: 80, height: 80 }}
                                                className="rounded-2xl" />
                                            <View className="flex-1 flex justify-center pl-3 space-y-3">
                                                <Text style={{ color: theme.text }}
                                                    className="font-semibold">
                                                    {game.jobId}
                                                </Text>
                                                <View className="flex-row space-x-3">
                                                    <View className="flex-row space-x-1">

                                                        <Text className="text-xs text-gray-700">
                                                            $ {game.labourRates}
                                                        </Text>
                                                    </View>
                                                    <View className="flex-row space-x-1">

                                                        <Text className="text-xs text-gray-700">
                                                            {game.date.slice(0,10)}
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
                <JobBottomBar activeSort={activeSort} setActiveSort={setActiveSort} />
            </View>
        </LinearGradient>

    )
}