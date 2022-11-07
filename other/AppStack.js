import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen1 from '../screens/HomeScreen';

import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddProduct from '../screens/AddProduct';
import InventoryScreen from '../screens/FavoritesScreen';
import EditProfile from '../screens/EditProfile';
import AddPost from '../screens/AddPost';
import AddPostScreen from '../screens/AddPostScreen';
import HomeScreenPost from '../screens/HomeScreenPost';
//import ChatScreen from '../screens/ChatScreen';
//import ProfileScreen from '../screens/ProfileScreen';
//import AddPostScreen from '../screens/AddPostScreen';
//import MessagesScreen from '../screens/MessagesScreen';
//import EditProfileScreen from '../screens/EditProfileScreen';
import { screenOption } from './navigation';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const COLORS = { primary: '#fffaf2', white: '#fff', black: '#000000', turquesa: '#0ffff7', green: '#88ffad', grey: '#82877c' };

const FeedStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="TRUEQUE"
      component={HomeScreenPost}
      
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: COLORS.black,
         
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#000000',
          elevation: 4,
        },
        headerRight:()=>(
          <View style={{marginRight: 15}}>
            <Ionic
              name="log-out-outline"
              size={24}
              backgroundColor="#fff"
              color="#000000"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>

        ),
        /*
        headerRight: () => (
          <View style={{marginRight: 5}} >
            <FontAwesome5.Button
              name="plus"
              size={24}
              backgroundColor="#fff"
              color="#000000"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),*/
      }}
    />

    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.primary,
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        /*
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),*/
      }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },/*
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),*/
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: 'Editar Perfil',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{marginRight: 5}} >
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
              <Ionic name="checkmark" style={{ fontSize: 35 }} />
            </TouchableOpacity>
          </View>
        ),

        headerBackTitleVisible: false,
        headerLeft: () => (

          <View style={{ marginLeft: 15 }}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
              <Ionic name="close-outline" style={{ fontSize: 35 }} />
            </TouchableOpacity>
          </View>
          
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Editar Perfil',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.black,
      }}>
      <Tab.Screen
        name="Home"

        component={FeedStack}
        options={({ route }) => ({
          tabBarLabel: 'Inicio',
          headerShown: false,
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Mensajes"
        component={MessagesScreen}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Añadir"
        component={AddPostScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={COLORS.green} size={34} style={{
              shadowColor: COLORS.green,
              shadowOffset:{width:0,height:0},
              shadowRadius:10,
              shadowOpacity:0.3
            }} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={InventoryScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default AppStack;
