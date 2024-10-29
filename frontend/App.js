// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LogoScreen from './screens/LogoScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import BottomTabNavigator from './screens/BottomMenu';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserProfile from './screens/UserProfileScreen';
import GfgScreen from './screens/GfgScreen';
import ChatBot from './screens/ChatBot';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Logo" component={LogoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Bottom" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: true }} />
        <Stack.Screen name="userprofile" component={UserProfile} options={{ headerShown: true }} />
        <Stack.Screen name="gfgprofile" component={GfgScreen} options={{ headerShown: true }} />
        <Stack.Screen name="ChatBot" component={ChatBot} options={{ headerShown: true }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
