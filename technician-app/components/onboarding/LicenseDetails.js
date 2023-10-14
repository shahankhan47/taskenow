import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
import StyledButton from '../common/StyledButton';

const { width } = Dimensions.get('window');

export default function LicenseDetails() {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [validityStart, setValidityStart] = useState('');
  const [validityEnd, setValidityEnd] = useState('');
  const [setComplete, setSetComplete] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>License Details</Text>

      {/* License Number */}
      <Text style={styles.label}>License Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter license number"
        value={licenseNumber}
        onChangeText={text => setLicenseNumber(text)}
      />

      {/* Validity Start */}
      <Text style={styles.label}>Validity Start Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter validity start date"
        value={validityStart}
        onChangeText={text => setValidityStart(text)}
      />

      {/* Validity End */}
      <Text style={styles.label}>Validity End Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter validity end date"
        value={validityEnd}
        onChangeText={text => setValidityEnd(text)}
      />

<StyledButton 
      title={"Verify Yourself"} 
      onPress={()=>setSetComplete(true)}
      complete = {setComplete}
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
});
