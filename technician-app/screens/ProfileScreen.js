import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { theme } from '../theme';
import StyledButton from '../components/common/StyledButton';
import { getData } from '../data/localData';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';
const { width, height } = Dimensions.get('window');

export default function Profile() {
  const [step, setStep] = useState(1);

  // Define your data fields for each section
  const sectionData = [
    {
      sectionTitle: 'General Details',
      fields: [
        { placeholder: 'First Name', key: 'firstName' },
        { placeholder: 'Last Name', key: 'lastName' },
        { placeholder: 'Phone Number', key: 'phoneNumber' },
        { placeholder: 'Email', key: 'email' },
        { placeholder: 'Password', key: 'password' },
      ],
      title: 'Register',
    },
    {
      sectionTitle: 'Address Data',
      fields: [
        { placeholder: 'Address Line 1', key: 'addressLine1' },
        { placeholder: 'City', key: 'city' },
        { placeholder: 'State', key: 'state' },
        { placeholder: 'Zip', key: 'zip' },
      ],
      title: 'Set on Map',
    },
    {
      sectionTitle: 'License Details',
      fields: [
        { placeholder: 'License Number', key: 'licenseNumber' },
        { placeholder: 'Expiration Date', key: 'expirationDate' },
      ],
      title: 'Verify Yourself',
    },
    {
      sectionTitle: 'Payment Related Details',
      fields: [
        { placeholder: 'Account Number', key: 'accountNumber' },
        { placeholder: 'Routing Number', key: 'routingNumber' },
        { placeholder: 'Last Four Digits of SSN', key: 'ssnLastFour' },
        { placeholder: 'Date of Birth', key: 'dateOfBirth' },
      ],
      title: 'Ready to Earn',
    },
  ];

  // Initialize the profile data state
  const [profileData, setProfileData] = useState([]);

  React.useEffect(async ()=>{
    
      // Retrieve the cached data from your local storage or cache
      const cachedData = await getData('technicianProfile');
      console.log(cachedData)
      setProfileData(cachedData)
      },[])

  

  // Function to get default profile data
  function getDefaultProfileData() {
    const defaultData = {};
    sectionData.forEach((section) => {
      section.fields.forEach((field) => {
        defaultData[field.key] = '';
      });
    });
    return defaultData;
  }

  const handleNext = () => {
    if (step < sectionData.length) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSaveProfile = () => {
    // Handle saving the profile data here
    // You can send the data to a server or store it locally
    // For simplicity, we'll just log the data for now
    console.log('Profile data:', profileData);
  };

  const updateProfileField = (key, value) => {
    // Update the profile data state with the new value
    setProfileData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Back button */}
      <SafeAreaView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          ...verticalMargin,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.background,
            borderRadius: 999,
            padding: 10,
          }}
          onPress={onSaveProfile}
        >
          <Text style={{ color: theme.text, fontSize: 20, fontWeight: 'bold' }}>
            Save
          </Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Profile fields */}
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          {sectionData[step - 1].sectionTitle}
        </Text>
        {sectionData[step - 1].fields.map((field, index) => (
          <TextInput
            key={index}
            placeholder={field.placeholder}
            value={profileData[field.key]}
            onChangeText={(text) => {
              // Update the value of the field
              updateProfileField(field.key, text);
            }}
            style={styles.input}
          />
        ))}
      </View>

      {/* Navigation buttons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <TouchableOpacity onPress={handlePrev} disabled={step === 1}>
          <ChevronLeftIcon size={40} color={step === 1 ? 'lightgray' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} disabled={step === sectionData.length}>
          <ChevronRightIcon size={40} color={step === sectionData.length ? 'lightgray' : 'black'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = {
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: theme.text,
    backgroundColor: theme.background,
    borderRadius: 5,
  },
};
