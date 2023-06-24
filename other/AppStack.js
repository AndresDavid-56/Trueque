import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionic from 'react-native-vector-icons/Ionicons';
import ProfileB from '../components/ProfileB';
import InfProfile from '../components/InfProfile';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen, { handleLocalImageUpload } from '../screens/AddPostScreen';
import HomeScreenPost from '../screens/HomeScreenPost';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, getAuth, signOut } from '../firebase-cometchat/firebase';
import Editposteo from '../components/Editposteo';
import { COLORS } from '../components/ProfileBody';
import InventoryProductEdit from '../components/InventoryProductEdit';
import InventoryEditScreen from '../screens/InventoryEditScreen';
import ChatsScreen from '../screens/ChatsScreen';
import AddChatScreen from '../screens/AddChatScreen';
import { darkGreen } from '../components/Constants';



import HomeScreen from '../screens/Home';
import ChatsScreen1 from '../screens/ChatsScreen1';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

function ProfileGroupScreen({ navigation }) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('¡Sesión Cerrada exitosamente!')
        navigation.navigate('LoginScreen1');
        Alert.alert('¡Sesión Cerrada exitosame!')

      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilInventario" component={ProfileB} options={{
        headerLeft: null,
        headerTitle: 'Perfil',

        headerRight: () => (
          <View style={{ marginRight: 15 }}>
            <Ionic
              name="log-out-outline"
              size={24}
              backgroundColor="#fff"
              color={COLORS.white}
              onPress={handleSignOut}
            />
          </View>

        ),
        headerTitleStyle: {
          color: COLORS.white,

          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: darkGreen
        },

      }} />
      <Stack.Screen
        //Editar Perfil!
        name="InventoryEditScreen"
        component={InventoryEditScreen}
        options={{
          title: 'Producto Seleccionado',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: COLORS.white,
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: darkGreen
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate('PerfilInventario')}>
                <Ionic name="close-outline" style={{ fontSize: 35, color: COLORS.white }} />
              </TouchableOpacity>
            </View>

          ),
        }}
      />
      <Stack.Screen
        //Editar Perfil!
        name="EditProfile"
        component={InfProfile}
        options={{
          title: 'Editar Perfil',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: COLORS.white,

          },


          headerStyle: {
            backgroundColor: darkGreen,
            shadowColor: '#fff',
            elevation: 0,
          },


          headerBackTitleVisible: false,
          headerLeft: () => (

            <View style={{ marginLeft: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate('PerfilInventario')}>
                <Ionic name="close-outline" style={{ fontSize: 35, color: COLORS.white }} />
              </TouchableOpacity>
            </View>

          ),
        }}
      />
      <Stack.Screen
        name="Editposteo"
        component={Editposteo}
        options={{
          title: 'Editar Producto',
          headerTitleAlign: 'center',
          presentation: 'modal',
          headerTitleStyle: {
            color: COLORS.white,
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: darkGreen,
            shadowColor: '#fff',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate('PerfilInventario')}>
                <Ionic name="arrow-back-outline" style={{ fontSize: 35, color: COLORS.white }} />
              </TouchableOpacity>
            </View>

          )


        }}
      />
    </Stack.Navigator>
  );
}

function ChatGroupScreen({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{
          title: 'Chats',
          headerTitleAlign: 'center',
          headerBack: false,
          headerTitleStyle: {
            color: COLORS.white,

          },
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#fff',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <Ionic
                name=""
                size={24}
                backgroundColor="#fff"
              />
            </View>

          ),
        }}

      >
      </Stack.Screen>
      <Stack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          title: 'Chat',
          headerTitleAlign: 'center',
          headerBack: false,
          headerTitleStyle: {
            color: COLORS.white,

          },
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate('PerfilInventario')}>
                <Ionic name="arrow-back-outline" style={{ fontSize: 35, color: COLORS.white }} />
              </TouchableOpacity>
            </View>

          ),
          headerStyle: {
            backgroundColor: darkGreen,
            shadowColor: '#fff',
            elevation: 0,
          },
          
        }}
      >
      </Stack.Screen>
      <Stack.Screen
        name="AddChat"
        component={AddChatScreen}
        options={{
          title: 'Mensajes',
          headerTitleAlign: 'center',
          headerBack: false,
          headerTitleStyle: {
            color: COLORS.white,

          },
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#fff',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <Ionic
                name=""
                size={24}
                backgroundColor="#fff"
              />
            </View>

          ),
        }}
      >
      </Stack.Screen>

    </Stack.Navigator>
  )
}



export const FeedStack = ({ navigation }) => (

  <Stack.Navigator>
    <Stack.Screen
      name="TRUEQUE"

      component={HomeScreenPost}


      options={{

        headerTitleAlign: 'center',

        headerTitleStyle: {
          color: COLORS.white,

          fontSize: 18,
        },

        headerStyle: {
          shadowColor: '#000000',
          elevation: 4,
          backgroundColor: darkGreen,
          borderBottomEndRadius:15,
          borderBottomStartRadius:15
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
          borderBottomEndRadius:15,
          borderBottomStartRadius:15
        },

      }}
    />
  </Stack.Navigator>
);


const AppStack = ({ navigation }) => {
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
      screenOptions={{
        tabBarActiveTintColor: COLORS.white,
        tabBarStyle: { backgroundColor: darkGreen },
        tabBarInactiveTintColor: '#c3c3c3'

      }}>

      <Tab.Screen
        name="Inicio"

        component={FeedStack}
        options={({ route }) => ({
          //tabBarLabel: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Mensajes"
        component={ChatGroupScreen}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          headerTitleStyle: {
            color: COLORS.white,

            fontSize: 18,
          },

          headerShown: false,
          headerStyle: {
            backgroundColor: COLORS.primary
          },

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses"
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

          headerTitleStyle: {
            color: COLORS.white,

            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: darkGreen,
            borderBottomEndRadius:15,
          borderBottomStartRadius:15
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle"
              color={color}
              size={size}
            />
          ),

        })}

      />

      <Tab.Screen
        name="Perfil"
        component={ProfileGroupScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),


        }}
        
      />



    </Tab.Navigator>
  );
};

export default AppStack;
