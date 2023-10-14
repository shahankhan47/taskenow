import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (field, key, value) => {
  try {
    const data = await getData(field);
    if (data && data[key] === value) {
      // Value is the same, no need to update
      return;
    }

    const newData = { ...(data || {}), [key]: value };
    await AsyncStorage.setItem(field, JSON.stringify(newData));
  } catch (error) {
    console.log("Error", error);
  }
};

export const removeData = async (field) => {
  try {
    await AsyncStorage.removeItem(field);
  } catch (error) {
    console.log("Error", error);
  }
};

export const getData = async (field) => {
  try {
    const data = await AsyncStorage.getItem(field);
    console.log(data);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Error", error);
    return null;
  }
};

export const removeAllData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(allKeys);
    } catch (error) {
      console.log("Error", error);
    }
  };