import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarDaysIcon, CheckBadgeIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

export default function MyJobDetail(props) {
  const { route } = props;
  const navigation = useNavigation();
  const job = route.params;

  const isInspection = job.jobType === 'Repairing';

  const [editableDescription, setEditableDescription] = useState(job.description);
  const [date, setDate] = useState(job.date);

  const handleDescriptionChange = (text) => {
    setEditableDescription(text);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const updateJob = (updatedData) => {
    // Handle the job update here with the updatedData, which includes description and date.
    // You can pass it to a server or update it locally as needed.
    closeDatePicker();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 15 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderWidth: 1, borderColor: 'gray', borderRadius: 50, padding: 5 }}
          >
            <ChevronLeftIcon size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
            paddingBottom: 20,
            shadowColor: 'gray',
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.7,
          }}
        >
          <Text
            style={{ color: theme.text, marginTop: 20, fontSize: 24, fontWeight: 'bold' }}
          >
            {job.jobId}
          </Text>
        </View>
      </SafeAreaView>
      <View style={styles.container} className="gap-y-5">
        <Text style={styles.header}>Job Status: {job.jobStatus}</Text>
        <Text style={styles.subText}>Job Date: {date.slice(0, 10)}</Text>
        <Text style={styles.subText}>Name: {job.customerName}</Text>
        <Text style={styles.subText}>Address: {job.customerAddress}</Text>
        <Text style={styles.subText}>Email: {job.customerEmail}</Text>
        <Text style={styles.subText}>Phone: {job.customerPhone}</Text>

        {isInspection && (
          <TextInput
            style={styles.descriptionInput}
            placeholder="Edit Description"
            value={editableDescription}
            onChangeText={handleDescriptionChange}
            multiline
          />
        )}

        {!isInspection && (
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              Price: {isInspection ? 'Variable Price' : `$ ${job.customerShowingCost}`}
            </Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 20, paddingTop: 10, padding: 10 }}>
        {isInspection ? (
          <TouchableOpacity
            style={{
              backgroundColor: theme.bg(0.8),
              height: 50,
              width: 180,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              // Handle completion of inspection
              updateJob({
                ...job,
                description: editableDescription,
                date: date,
              });
            }}
          >
            <CheckBadgeIcon size={20} color="#3182CE" />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete Inspection</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: theme.bg(0.8),
              height: 50,
              width: 180,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              // Handle job completion
              updateJob({
                ...job,
                date: date,
              });
            }}
          >
            <CheckBadgeIcon size={20} color="#3182CE" />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Job Completed</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity // Added button to change the date
          style={{
            backgroundColor: theme.bg(0.8),
            height: 50,
            width: 180,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20
          }}
          onPress={openDatePicker}
        >
          <CalendarDaysIcon size={20} color="#3182CE" />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Change Date</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Select a Date</Text>
              <TextInput
                type="date"
                style={styles.dateInput}
                value={date}
                onChange={(event) => handleDateChange(event.nativeEvent.text)}
              />
              <TouchableOpacity onPress={closeDatePicker}>
                <Text style={styles.modalCloseButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = {
  container: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    color: theme.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
  subText: {
    color: theme.text,
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: theme.text,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    height: 200,
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: 'gray',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: theme.text,
    borderRadius: 5,
    padding: 5,
  },
  modalCloseButton: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
};
