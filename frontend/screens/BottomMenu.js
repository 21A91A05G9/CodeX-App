// BottomTabNavigator.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import PotDsPage from './Potd';
// import ContestPage from './Contest';
import ContestList from './ContestScreen';
import ChatBot from './ChatBot';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [iconName, setIconName] = useState('HomeScreen');
  const [clickedTab, setClickedTab] = useState(null);

  // Function to return the component based on the iconName
  const getComponent = () => {
    switch (iconName) {
      case 'HomeScreen':
        return HomeScreen;
      case 'ProfileScreen':
        return ProfileScreen;
      case 'ChatBot':
        return ChatBot;
      case 'PotdScreen':
        return PotDsPage;
      case 'ContestScreen':
        return ContestList;
      // Add cases for other icon names if needed
      default:
        return HomeScreen; // Default to HomeScreen if iconName doesn't match
    }
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          style: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          listeners={{
            tabPress: () => {
              setShowDropdown(false);
              setIconName('HomeScreen');
              setClickedTab('HomeScreen');
            },
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../assets/home.png')}
                style={[styles.tabIcon, clickedTab === 'HomeScreen' ? styles.clickedTab : null]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Potd"
          component={PotDsPage}
          listeners={{
            tabPress: () => {
              setShowDropdown(false);
              setIconName('PotdScreen');
              setClickedTab('PotdScreen');
            },
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../assets/potd.png')}
                style={[styles.tabIcon, clickedTab === 'PotdScreen' ? styles.clickedTab : null, ]}
              />
            ),
          }}
        />

        <Tab.Screen
          name="ChatBot"
          component={ChatBot}
          listeners={{
            tabPress: () => {
              setShowDropdown(false);
              setIconName('ChatBot');
              setClickedTab('ChatBot');
            },
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../assets/chat.png')}
                style={[styles.tabIcon, clickedTab === 'ChatBot' ? styles.clickedTab : null,]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Contest"
          component={ContestList}
          listeners={{
            tabPress: () => {
              setShowDropdown(false);
              setIconName('ContestScreen');
              setClickedTab('ContestScreen');
            },
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../assets/contest.png')}
                style={[styles.tabIcon, clickedTab === 'ContestScreen' ? styles.clickedTab : null,]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={SearchScreen}
          listeners={{
            tabPress: () => {
              setShowDropdown(false);
              setIconName('SearchScreen');
              setClickedTab('SearchScreen');
            },
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../assets/user.png')}
                style={[styles.tabIcon, clickedTab === 'SearchScreen' ? styles.clickedTab : null]}
              />
            ),
          }}
        />
      </Tab.Navigator>
      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              setIconName('ProfileScreen');
              setShowDropdown(false);
            }}
          >
            <View style={styles.circle}>
              <Image
                source={require('../assets/user.png')}
                style={styles.dropdownIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              setIconName('ProfileScreen');
              setShowDropdown(false);
            }}
          >
            <View style={styles.circle}>
              <Image
                source={require('../assets/user.png')}
                style={styles.dropdownIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              setIconName('ProfileScreen');
              setShowDropdown(false);
            }}
          >
            <View style={styles.circle}>
              <Image
                source={require('../assets/user.png')}
                style={styles.dropdownIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'white',
    height: 60, // Increase height of the bottom bar
    borderTopWidth: 1, // Add border on top
    borderTopColor: '#ccc', // Border color
    paddingHorizontal: 155, // Add padding horizontally
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  middleIcon: {
    width: 36,
    height: 36,
  },
  middleIconBig: {
    width: 40,
    height: 40,
  },
  clickedTab: {
    transform: [{ scale: 1.2 }], // Increase size when clicked
  },
  dropdown: {
    position: 'absolute',
    bottom: 75, // Adjust the distance from the bottom of the screen
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  dropdownIcon: {
    width: 28,
    height: 28,
  },
  circle: {
    width: 41,
    height: 41,
    borderRadius: 42 / 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderColor: 'black',
  },
});

export default BottomTabNavigator;
