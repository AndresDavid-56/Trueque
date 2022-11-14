import React from 'react';
import { View, TouchableOpacity, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionic from 'react-native-vector-icons/Ionicons';
import ProfileB from '../components/ProfileB';
import InfProfile from '../components/InfProfile';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import HomeScreenPost from '../screens/HomeScreenPost';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, getAuth, signOut } from '../firebase-cometchat/firebase';
import Editposteo from '../components/Editposteo';

import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const COLORS = { primary: '#fffaf2', white: '#fff', black: '#000000', turquesa: '#0ffff7', green: '#88ffad', grey: '#82877c' };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);


export const FeedStack = ({ navigation }) => (
  
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
        headerLeft: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionic
              name=""
              size={24}
              backgroundColor="#fff"
              color="#000000"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>

        ),
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
        },

      }}
    />
    <Stack.Screen
      name="Editposteo"
      component={Editposteo}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    
    <Stack.Screen
    //Editar Perfil!
      name="EditProfile"
      component={InfProfile}
      options={{
        title: 'Editar Perfil',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff', 
          shadowColor: '#fff',
          elevation: 0,
        }, 
        

        headerBackTitleVisible: false,
        headerLeft: () => (

          <View style={{ marginLeft: 15 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
              <Ionic name="close-outline" style={{ fontSize: 35 }} />
            </TouchableOpacity>
          </View>

        ),
      }}
    />
  </Stack.Navigator>
);


const AppStack = ({navigation}) => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };
  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
       console.log('¡Sesión Cerrada exitosamente!')
       navigation.navigate('LoginScreen1');
       Alert.alert('¡Sesión Cerrada exitosame!')

    })
    .catch(error=>{
       console.log(error)
    })
 }

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
        component={HomeScreen}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
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
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              color={color}
              size={size}
            />
          ),
        })}
        
      />
      
      <Tab.Screen
        name="Perfil"
        component={ProfileB}
        options={{
          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <Ionic
                name="log-out-outline"
                size={24}
                backgroundColor="#fff"
                color="#000000"
                onPress={handleSignOut}
              />
            </View>

          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default AppStack;
