import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
import StyledButton from '../common/StyledButton';

const { width } = Dimensions.get('window');

export default function PaymentDetails() {
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [ssnLastFour, setSsnLastFour] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [setComplete, setSetComplete] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      {/* Account Number */}
      <Text style={styles.label}>Account Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter account number"
        value={accountNumber}
        onChangeText={text => setAccountNumber(text)}
        keyboardType="numeric"
      />

      {/* Routing Number */}
      <Text style={styles.label}>Routing Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter routing number"
        value={routingNumber}
        onChangeText={text => setRoutingNumber(text)}
        keyboardType="numeric"
      />

      {/* SSN Last Four Digits */}
      <Text style={styles.label}>Last Four Digits of SSN</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter last four digits of SSN"
        value={ssnLastFour}
        onChangeText={text => setSsnLastFour(text)}
        keyboardType="numeric"
      />

      {/* Date of Birth */}
      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date of birth (MM/DD/YYYY)"
        value={dateOfBirth}
        onChangeText={text => setDateOfBirth(text)}
      />

<StyledButton 
      title={"Start Earming"} 
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
