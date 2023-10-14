import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen.js';
import OnboardingScreen from '../screens/OnboardingScreen.js';
import { getItem } from '../utils/asyncStorage.js';
import Landing from '../components/Landing/Landing.js';
import LoginScreen from '../components/Landing/SignIn.js';
import JobDetail from '../components/Home/DetailJob.js';
import Profile from '../screens/ProfileScreen.js';
import Payment from '../screens/PaymentScreen.js';
import MyJobs from '../screens/MyJobs.js';
import MyJobDetail from '../components/Home/MyJobDetail.js';
import MyPaymentDetail from '../components/Home/MyPaymentDetail.js';
import MyCalendar from '../components/Home/Calender.js';


const Stack = createNativeStackNavigator();


export default function AppNavigation() {

  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, [])

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  }

  if (showOnboarding == null) {
    return null;
  }


  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen name="Landing" options={{ headerShown: false }} component={Landing} />
          <Stack.Screen name="JobDetail" options={{ headerShown: false }} component={JobDetail} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
          <Stack.Screen name="Payments" options={{ headerShown: false }} component={Payment} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="MyJob" options={{ headerShown: false }} component={MyJobs} />
          <Stack.Screen name="MyJobDetail" options={{ headerShown: false }} component={MyJobDetail} />
          <Stack.Screen name="MyPaymentDetail" options={{ headerShown: false }} component={MyPaymentDetail} />
          <Stack.Screen name="Calender" options={{ headerShown: false }} component={MyCalendar} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Landing" options={{ headerShown: false }} component={Landing} />
          <Stack.Screen name="JobDetail" options={{ headerShown: false }} component={JobDetail} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
          <Stack.Screen name="Payments" options={{ headerShown: false }} component={Payment} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="MyJobs" options={{ headerShown: false }} component={MyJobs} />
          <Stack.Screen name="MyJobDetail" options={{ headerShown: false }} component={MyJobDetail} />
          <Stack.Screen name="MyPaymentDetail" options={{ headerShown: false }} component={MyPaymentDetail} />
          <Stack.Screen name="Calender" options={{ headerShown: false }} component={MyCalendar} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }


}
