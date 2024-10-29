import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleLoginSuccess = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userEmail', email);
      setEmail(''); // Clear the email input
      setPassword(''); // Clear the password input
      navigation.replace('Bottom'); 
    } catch (error) {
      Alert.alert('Error', 'Failed to store authentication token.');
    }
  };

  const validateEmail = (email) => {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter both email and password.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }


    const userData = { email, password };
    setLoading(true); // Set loading to true

    axios.post('http://192.168.1.6:5000/login', userData)
      .then(res => {
        setLoading(false); // Set loading to false
        if (res.data.status === 'ok') {
          handleLoginSuccess(res.data.data);
        } else {
          Alert.alert('Login Failed', 'Invalid credentials. Please try again.'); // Generic message for failed login
        }
      })
      .catch(error => {
        setLoading(false); // Set loading to false
        if (error.response && error.response.status === 400) {
          Alert.alert('Login Failed', error.response.data.error);
        } else {
          Alert.alert('An error occurred', 'Please check your network and try again.');
        }
      });
  };

  return (
    <ImageBackground
      source={require('../assets/bg2.png')}
      style={styles.background}
      imageStyle={{ opacity: 0.1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Email"
          style={styles.input}
          mode="outlined"
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          required
        />
        <TextInput
          label="Password"
          style={styles.input}
          mode="outlined"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          required
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : 'Login'}
        </Button>
        <Text style={styles.signupText}>New User? <Text style={styles.signupLink} onPress={handleSignUpPress}>Sign Up</Text></Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000000',
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000000',
  },
  signupLink: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
