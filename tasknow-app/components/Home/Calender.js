import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledButton from '../common/StyledButton';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';

const STORAGE_KEY = 'selectedDates';

const MyCalendar = () => {
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    loadSelectedDates();
  }, []);

  const loadSelectedDates = async () => {
    try {
      const savedDatesJSON = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedDatesJSON !== null) {
        const savedDates = JSON.parse(savedDatesJSON);
        setSelectedDates(savedDates);
      }
    } catch (error) {
      console.error('Error loading selected dates:', error);
    }
  };

  const saveSelectedDates = async () => {
    try {
      const selectedDatesJSON = JSON.stringify(selectedDates);
      await AsyncStorage.setItem(STORAGE_KEY, selectedDatesJSON);
    } catch (error) {
      console.error('Error saving selected dates:', error);
    }
  };

  const handleDayPress = (day) => {
    const updatedDates = { ...selectedDates };
    console.log(day.date.dateString)
    if (updatedDates[day.date.dateString]) {
      delete updatedDates[day.date.dateString];
    } else {
      updatedDates[day.date.dateString] = { borderWidth:1,borderColor : '#89CFF0' , borderRadius:'12px'};
    }
    setSelectedDates(updatedDates);
    saveSelectedDates();
  };

  const renderDay = (day) => {
    const customStyle = selectedDates[day.date.dateString] || {};
    console.log(customStyle)
    return (
      <TouchableOpacity style={styles.day} onPress={() => handleDayPress(day)}>
        <Text style={[styles.dayText, customStyle]}>{day.date.day}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Text style={styles.title}>Set your Schedule</Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={selectedDates}
          markingType={'custom'}
          style={styles.calendar}
          dayComponent={renderDay}
        />
      </View>

      <StyledButton
        title={'Set Your Schedule'}
        onPress={() => Alert.alert('Your Schedule has been set')}
        complete={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  calendarContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  day: {
    backgroundColor: 'transparent', // Set the background to transparent
    
  },
  dayText: {
    fontSize: 16,
    padding:6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyCalendar;
