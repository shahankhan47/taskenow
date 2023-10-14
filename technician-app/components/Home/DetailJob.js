import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'expo-checkbox';

export default function JobDetail(props) {
  const navigation = useNavigation();
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesData, setServicesData] = useState([
    // Sample services data
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
    { id: 3, name: 'Service 3' },
    // Add more services as needed
  ]);

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const updateServices = () => {
    // You can handle the selected services here and perform any necessary actions.
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Available Services</Text>
      {servicesData.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[
            styles.serviceItem,
            selectedServices.includes(service.id) && styles.selectedServiceItem,
          ]}
          onPress={() => toggleService(service.id)}
        >
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={selectedServices.includes(service.id)}
              onValueChange={() => toggleService(service.id)}
              color="blue"
              style={styles.checkbox}
            />
          </View>
          <Text
            style={[
              styles.serviceText,
              selectedServices.includes(service.id) && styles.selectedServiceText,
            ]}
          >
            {service.name}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={updateServices} style={styles.updateButton}>
        <Text style={styles.buttonText}>Update Services</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical:20,
    paddingLeft:20,
    borderRadius:12
  },
  selectedServiceItem: {
    backgroundColor: '#F5F5F5', // Change the background color when selected
  },
  checkboxContainer: {
    marginRight: 10,
    color:'#89CFF0',
    borderColor:'#89CFF0'
  },
  checkbox: {
    borderRadius: 5,
    color:'#89CFF0',
    borderColor:'#89CFF0'
  },
  serviceText: {
    fontSize: 16,
  },
  selectedServiceText: {
    color: '#89CFF0', // Change the text color when selected
  },
  updateButton: {
    backgroundColor: '#89CFF0',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
