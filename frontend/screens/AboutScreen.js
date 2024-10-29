import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

const AboutScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      source={require('../assets/bg1.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.posterContainer}>
          <Image
            source={require('../assets/logo2.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>
            CodeX, Dive into your coding journey with personalized stats and reminders!
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 90,
  },
  posterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    backgroundColor: 'transparent', // Add transparent background
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    
  },
  description: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 30,
    elevation:20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default AboutScreen;
