import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground,Image,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [username3, setUsername3] = useState('');
  const [showViewProfile, setShowViewProfile] = useState(false); // State to toggle "View Profile" button
  const [userDetails, setdetails] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to trigger component refresh
  const navigation = useNavigation(); // Initialize useNavigation hook here
  const [refresh1, setRefresh1] = useState(false); // State to trigger component refresh

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, [refresh]); // Listen for changes in the 'refresh' state

  const fetchData = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found');
      }

      // Send token along with the username and platform to the backend
      const response = await axios.post('http://192.168.1.6:5000/plat_details', {}, {
        headers: {
          Authorization: token, // Send token in the Authorization header
        },
      });
      setLoading(false);
      setdetails(response.data.platforms);
    } catch (error) {
    //  console.error('Error getting details:', error);
      alert('An error occurred while getting details.');
    }
  };

  const handleAddUsername = async (platform, username) => {
    if (!username.trim()) {
      alert('Please enter a username.');
      return;
    }
    const check = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
    if (check && check.data && check.data.errors) {
      const userNotFoundError = check.data.errors.some(error => error.message === 'That user does not exist.');
      if (userNotFoundError) {
        alert('That user does not exist.');
      } else {
        setShowViewProfile(false);
      }
    } else {
      alert("success");
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.post('http://192.168.1.6:5000/update-username', { platform, username }, {
        headers: {
          Authorization: token,
        },
      });
      // Update the input state to trigger the "View Profile" state
      switch (platform) {
        case 'leetcode':
          setUsername1(''); // Clear the input field
          break;
        case 'geekforgeeks':
          setUsername2('');
          break;
        case 'codechef':
          setUsername3('');
          break;
        default:
          break;
      }
     // setShowViewProfile(true);
      setRefresh(!refresh); // Toggle 'refresh' state to trigger component refresh
    }
  };


  const handleAddUsernamegfg = async (platform, username) => {
    if (!username.trim()) {
      alert('Please enter a username.');
      return;
    }
  
    if (platform === 'geekforgeeks') {
      try {
        const check = await axios.get(`https://geeks-for-geeks-api.vercel.app/${username}`);
        console.log(check)
        
        if (!check.data.info.profilePicture && check.data.errors) {
          const userNotFoundError = check.data.errors.some(error => error.message === 'That user does not exist.');
          if (userNotFoundError) {
            alert('That user does not exist.');
            return; // Exit function if user does not exist
          } else {
            setShowViewProfile(false);
          }
        } else {
          // Username is valid, proceed to add it
          alert("success")
          const token = await AsyncStorage.getItem('authToken');
          if (!token) {
            throw new Error('Token not found');
          }
  
          const response = await axios.post('http://192.168.1.6:5000/update-username', { platform, username }, {
            headers: {
              Authorization: token,
            },
          });
          // Switch to "View Profile" mode after adding username
          //setShowViewProfile(true);
          setRefresh(!refresh);
        }
      } catch (error) {
        //console.error('Error occurred:', error);
        // Handle error appropriately
      }
    }
  }
  

  const handleViewProfile = async (username) => {
    try {
      if (!username.trim()) {
        alert('Please enter a username.');
        return;
      }
      console.log(username)
      // Make a GET request to the LeetCode API endpoint with the entered username
      const response = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
      
      // Check if the response contains valid data
      if (response && response.data) {
        // Extract the data from the response
        const leetCodeData = response.data;
        console.log(leetCodeData)
        // Navigate to the new screen and pass the data as a parameter
        navigation.navigate('profile', { leetCodeData, username});
      } else {
        // Notify the user that the username is not found
        alert('Username not found.');
      }
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error fetching LeetCode data:', error.message);
      alert('An error occurred while fetching user data. Please try again.');
}
};

const handleViewgfg = async (username) => {
  try {
    if (!username.trim()) {
      alert('Please enter a username.');
      return;
    }

    // Make a GET request to the LeetCode API endpoint with the entered username
    const response = await axios.get(`https://geeks-for-geeks-api.vercel.app/${username}`);
    
    // Check if the response contains valid data
    if (response && response.data) {
      // Extract the data from the response
      const geekData = response.data;

      // Navigate to the new screen and pass the data as a parameter
      navigation.navigate('gfgprofile', { geekData, username});
    } else {
      // Notify the user that the username is not found
      alert('Username not found.');
    }
  } catch (error) {
    // Handle errors if the request fails
    console.error('Error fetching LeetCode data:', error.message);
    alert('An error occurred while fetching user data. Please try again.');
}
};

 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <ImageBackground source={require('../assets/bg2.png')} style={styles.backgroundImage}  imageStyle={{opacity: 0.3}} >
        <>
        {userDetails && (
          <View>
            {userDetails.leetcode === "" ? (
              // If userDetails.leetcode is empty
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Image source={require('../assets/leet.png')} style={styles.image} />
                  <Text style={styles.cardTitle}>LeetCode</Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={username1}
                    onChangeText={(text) => setUsername1(text)}
                  />
                  <TouchableOpacity style={styles.addButton} onPress={() => handleAddUsername('leetcode', username1)}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
            ) : (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Image source={require('../assets/leet.png')} style={styles.image} />
                  <Text style={styles.cardTitle}>LeetCode</Text>
                </View>
                <TouchableOpacity style={styles.viewProfileButton} onPress={()=>handleViewProfile(userDetails.leetcode)}>
                  <Text style={styles.buttonText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            )}

            {userDetails.geekforgeeks === "" ? (
              // If userDetails.geekforgeeks is empty
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Image source={require('../assets/gfg1.png')} style={styles.imageg} />
                  <Text style={styles.cardTitle}>GeeksForGeeks</Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={username2}
                    onChangeText={(text) => setUsername2(text)}
                  />
                  <TouchableOpacity style={styles.addButton} onPress={() => handleAddUsernamegfg('geekforgeeks', username2)}>
                  <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
              ) : (
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <Image source={require('../assets/gfg1.png')} style={styles.imageg} />
                    <Text style={styles.cardTitle}>GeeksForGeeks</Text>
                  </View>
                  <TouchableOpacity style={styles.viewProfileButton} onPress={()=>handleViewgfg(userDetails.geekforgeeks)}>
                    <Text style={styles.buttonText}>View Profile</Text>
                  </TouchableOpacity>
                </View>
              )}

              {userDetails.codechef === "" ? (
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <Image source={require('../assets/chef.png')} style={styles.image} />
                    <Text style={styles.cardTitle}>CodeChef</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter username"
                      value={username3}
                      onChangeText={(text) => setUsername3(text)}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddUsername('codechef', username3)}>
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <Image source={require('../assets/chef.png')} style={styles.image} />
                    <Text style={styles.cardTitle}>CodeChef</Text>
                  </View>
                  <TouchableOpacity style={styles.viewProfileButton} onPress={()=>handleViewProfile(userDetails.codechef)}>
                    <Text style={styles.buttonText}>View Profile</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          
        </>
        </ImageBackground>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1.2, // Add border width
    borderColor: 'black', 
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 5,
    margin: 20,
    padding: 15,
    // width: 320,
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
  imageg: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: 'black',
    paddingVertical: 10,
    margin: 10,
  },
  addButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewProfileButton: {
    backgroundColor: 'black',
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
