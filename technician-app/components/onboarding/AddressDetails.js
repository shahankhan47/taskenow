import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
import StyledButton from '../common/StyledButton';
import { getData, storeData } from '../../data/localData';
import { useEffect } from 'react';
import { makeRequest } from '../../data/api';

const { width } = Dimensions.get('window');

export default function AddressDetails() {
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [workingZone, setWorkingZone] = useState('');
  const [userId, setUserId] = useState('');
  const [setComplete, setSetComplete] = useState(false);

  useEffect(async ()=>{
    const id = await getData("technicianProfile");
    setUserId(id);
  },[])

  const registerAddress = React.useCallback(async () => {
    const data = {
      addressLine1:addressLine1,
      city:city,
      state:state,
      zip:zip,
      miles_distance:workingZone
    };

    console.log(userId)

    await makeRequest(`/api/technician/${userId.techId}`,"put",data).then(async (res)=>{
      console.log(res.data)
      await storeData("technicianProfile","addressLine1",`${res.data.addressLine1}`);
      await storeData("technicianProfile","addressLine2",`${res.data.addressLine2}`);
      await storeData("technicianProfile","city",`${res.data.city}`);
      await storeData("technicianProfile","state",`${res.data.state}`);
      await storeData("technicianProfile","zip",`${res.data.zip}`);
      await storeData("technicianProfile","miles_distance",`${res.data.miles_distance}`);
      await storeData("technicianProfile", "addressProfile", `true`);
      
      setSetComplete(true)
    }).catch((err) => {
      console.log(err);
  })


  })


  React.useEffect(() => {
    async function loadId() {
      const id = await getData("technicianProfile");
      console.log(id)
      if (id.addressProfile === "true") {
        setSetComplete(true)
      }
    }

    loadId()
  }, [])



  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Address Details</Text>

      {/* Address Line 1 */}
      <Text style={styles.label}>Street Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter address line 1"
        value={addressLine1}
        onChangeText={text => setAddressLine1(text)}
      />

     

      {/* City */}
      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={text => setCity(text)}
      />

      {/* State */}
      <Text style={styles.label}>State</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter state"
        value={state}
        onChangeText={text => setState(text)}
      />

      {/* ZIP Code */}
      <Text style={styles.label}>ZIP Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ZIP code"
        value={zip}
        onChangeText={text => setZip(text)}
        keyboardType="numeric"
      />

      {/* Working Zone */}
      <Text style={styles.label}>Working Zone</Text>
      <TextInput
        style={[styles.input]}
        placeholder="Enter your working zone"
        value={workingZone}
        onChangeText={text => setWorkingZone(text)}
      />

<StyledButton
      title={"Set your Working Area"} 
      onPress={registerAddress}
      complete={setComplete}/>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
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
    height: 120,
    textAlignVertical: 'top',
  },
});
