import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import StyledButton from '../common/StyledButton';
import { makeRequest } from '../../data/api';
import { getData, storeData } from '../../data/localData';
import { removeAllData } from '../../data/localData';

const { width } = Dimensions.get('window');

export default function GeneralDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [setComplete, setSetComplete] = useState(false);


  const registerTechnician = React.useCallback(async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: bio
    };

    console.log(data);


    await makeRequest("/api/technician/", "post", data).then(async (res) => {
      console.log(res.data)
      removeAllData();
      await storeData("technicianProfile", "techId", `${res.data._id}`);
      await storeData("technicianProfile", "firstName", `${res.data.firstName}`);
      await storeData("technicianProfile", "lastName", `${res.data.lastName}`);
      await storeData("technicianProfile", "email", `${res.data.email}`);
      await storeData("technicianProfile", "phoneNumber", `${res.data.phoneNumber}`);
      await storeData("technicianProfile", "password", `${res.data.password}`);
      await storeData("technicianProfile", "profileCompleted", `true`);

      setSetComplete(true)
    }).catch((err) => {
      console.log(err);
    })


  })


  React.useEffect(() => {
    async function loadId() {
      const id = await getData("technicianProfile");
      console.log(id)
      if (id.profileCompleted === "true") {
        setSetComplete(true)
      }
    }

    loadId()
  }, [])


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>General Details</Text>

      {/* First Name */}
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your first Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />

      {/* Last Name */}
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />

      {/* Email Address */}
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />

      {/* Bio */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Password"
        value={bio}
        onChangeText={text => setBio(text)}
      />

      <StyledButton
        title={"Register Yourself"}
        onPress={registerTechnician}
        complete={setComplete}
      />


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    // borderRadius:"12px"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  bioInput: {
    textAlignVertical: 'top',
  },
});
