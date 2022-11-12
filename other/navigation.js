import React from 'react'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/Home'
import LoginScreen from '../screens/Login'
import ChatScreen from '../screens/Chat'
import LoginScreen1 from '../screens/LoginScreen'
import OnboardingScreen from '../screens/OnboardingScreen'
import SignupScreen from '../screens/SignupScreen'
import MessagesScreen from '../screens/MessagesScreen'
import EditPost from '../screens/EditPost'
import AppStack from './AppStack'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Stack = createNativeStackNavigator()
export const  screenOption = {
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
      initialRouteName="OnboardingScreen"
      screenOptions={screenOption}
    >
      
      <Stack.Screen name="LoginScreen1" component={LoginScreen1} />
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen}/>
      <Stack.Screen name="AppStack" component={AppStack}/>
      <Stack.Screen name="Messages" component={MessagesScreen}/>
      <Stack.Screen name="EditPost" component={EditPost}/>

      

      
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button 
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('LoginScreen1')}
              />
            </View>
          ),
        })}/>
      
    </Stack.Navigator>
  </NavigationContainer>
)
