import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/Home'
import LoginScreen from '../screens/Login'
import ChatScreen from '../screens/Chat'

const Stack = createNativeStackNavigator()
const screenOption = {
  headerShown: false,
}

export const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOption}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={screenOption}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)