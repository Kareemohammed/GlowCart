import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { ThemeContext } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#fff',
          borderTopColor: isDarkMode ? '#222' : '#eee',
        },
        tabBarActiveTintColor: '#B84953',
        tabBarInactiveTintColor: isDarkMode ? '#888' : '#999',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                size={28}
                color={focused ? '#B84953' : color}
              />
            );
          } else if (route.name === 'Offers') {
            return (
              <Ionicons
                name="pricetag-outline"
                size={28}
                color={color}
              />
            );
          } else if (route.name === 'Wishlists') {
            return (
              <FontAwesome
                name="heart-o"
                size={26}
                color={color}
              />
            );
          } else if (route.name === 'Profile') {
            return (
              <Ionicons
                name="person-outline"
                size={28}
                color={color}
              />
            );
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Offers" component={HomeScreen} />
      <Tab.Screen name="Wishlists" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {() => <MainTabs />}
        </Stack.Screen>
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
