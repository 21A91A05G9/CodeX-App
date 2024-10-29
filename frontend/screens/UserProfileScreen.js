import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, [refresh]); // Listen for changes in the 'refresh' state

  const fetchData = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');
      console.log(token)
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
      console.log(response.data);
    } catch (error) {
      console.error('Error getting details:', error);
      alert('An error occurred while getting details.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../assets/user.png')}
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity style={styles.editIconContainer} onPress={() => setModalVisible(true)}>
            <Image
              source={require('../assets/user.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>
      <Modal
        animationType="slide-from-top"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Image
                source={require('../assets/user.png')}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.buttonText, styles.saveButtonText]}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.body}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 10,
    padding: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
    padding: 5,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  body: {
    padding: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,

  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,

    // padding: 10,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  cancelButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  saveButton: {
    backgroundColor: 'black',
  },
  saveButtonText: {
    color: 'white',
  },
});

export default UserProfile;