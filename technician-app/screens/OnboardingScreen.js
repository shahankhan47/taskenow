import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';
import PaymentDetails from '../components/onboarding/PayememtsDetails';
import GeneralDetails from '../components/onboarding/GeneralDetails';
import AddressDetails from '../components/onboarding/AddressDetails';
import LicenseDetails from '../components/onboarding/LicenseDetails';

const {width} = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation();

    const handleDone = ()=>{
        navigation.navigate('Home');
        setItem('onboarded', '1');
    }

    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
        
    }
  return (
    <View style={styles.container}>
      <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            DoneButtonComponent={doneButton}
            containerStyles={{paddingHorizontal: 15}}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.lottie}>
                            {/* <Lottie source={require('../assets/animations/boost.json')} autoPlay loop /> */}
                            <GeneralDetails/>
                        </View>
                    ),
                    subtitle:"General Data registers you on the Platform"
                 
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.lottie}>
                            {/* <Lottie source={require('../assets/animations/work.json')} autoPlay loop /> */}
                            <AddressDetails/>
                        </View>
                    ),
                    subtitle:"Address details helps us to find best job near your location"
              
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.lottie}>
                            {/* <Lottie source={require('../assets/animations/work.json')} autoPlay loop /> */}
                          <LicenseDetails/>
                        </View>
                    ),
                    subtitle:"License Details helps us to onboard trusted technician"
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <View style={styles.lottie}>
                           <PaymentDetails/>
                        </View>
                    ),
                    subtitle:"Payment Data helps us to Pay for your efforts"
                },
            ]}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie:{
        width: width*0.9,
        height: width*1.4,
      
    },
    doneButton: {
        padding: 20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: '100%',
        // borderBottomLeftRadius: '100%'
    }
})