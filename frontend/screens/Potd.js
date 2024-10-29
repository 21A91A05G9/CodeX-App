// PotDsPage.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

const PotDsPage = () => {
  const [solvedDates, setSolvedDates] = useState({}); // Object to store solved dates
  const [isCheckedLeet, setIsCheckedLeet] = useState(false); // State variable to track checkbox status
  const [isCheckedGfg, setIsCheckedGfg] = useState(false);
  const [count , setCount] = useState(0)
   const onPressLeet = () => {
    // Toggle checkbox status
    setIsCheckedLeet(!isCheckedLeet);
    if(isCheckedLeet) setCount(count-1);
    else setCount(count+1);
   
  };
  const onPressGfg = () => {
    // Toggle checkbox status
    setIsCheckedGfg(!isCheckedGfg);
    if(isCheckedGfg) setCount(count-1);
    else setCount(count+1);
  };
  useEffect(() => {
    // Here you would fetch solved dates from your data source (e.g., API, database)
    // For demonstration, let's assume you have a function called fetchSolvedDates() that fetches solved dates
    const fetchSolvedDates = async () => {
      // Fetch solved dates from your data source and update the solvedDates state
      const solvedDatesFromAPI = await fetchSolvedDatesFromAPI();
      const newSolvedDates = {};
      solvedDatesFromAPI.forEach((date) => {
        newSolvedDates[date] = { selected: true, selectedColor: "#1E90FF" }; // Blue color for solved dates
      });
      setSolvedDates(newSolvedDates);
    };

    // Call the function to fetch solved dates
    fetchSolvedDates();
  }, []);
 // Function to fetch solved dates from API
 const fetchSolvedDatesFromAPI = async () => {
  // Simulate fetching solved dates from an API
  return ["2024-03-01", "2024-03-05", "2024-03-10"]; // Example list of solved dates
};

return (
  <View style={styles.container}>
    <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={require('../assets/leet.png')} style={styles.image} />
          <Text style={styles.cardTitle}>LeetCode Potd</Text>
        </View>
        <TouchableOpacity style={styles.checkbox} onPress={onPressLeet}>
          {/* Display different content based on checkbox status */}
          {isCheckedLeet ? <Text style={styles.buttonText}>✓</Text> : null}
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={require('../assets/logo.png')} style={styles.image} />
          <Text style={styles.cardTitle}>GFG Potd</Text>
        </View>
        <TouchableOpacity style={styles.checkbox} onPress={onPressGfg}>
          {/* Display different content based on checkbox status */}
          {isCheckedGfg ? <Text style={styles.buttonText}>✓</Text> : null}
        </TouchableOpacity>
      </View>
    <Calendar
      // Customize the calendar
      markedDates={solvedDates}
      // Add any other props as needed
    />
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:300,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  checkbox: {
    
    backgroundColor: 'gold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height:40,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PotDsPage;
