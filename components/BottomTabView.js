import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons } from "@expo/vector-icons";
import FavoritesScreen from '../screens/FavoritesScreen';
import InventoryScreen from '../screens/InventoryScreen';

const BottomTabView = () => {
  const Tab = createMaterialTopTabNavigator();

  let squares = [];
  let numberOfSquare = 124;

  for (let index = 0; index < numberOfSquare; index++) {
    squares.push(
      <View key={index}>
        <View
          style={{
            width: 130,
            height: 150,
            marginVertical: 0.5,
            backgroundColor: 'black',
            opacity: 0.1,
          }}></View>
      </View>,
    );
  }

  const Posts = () => {
    return (


      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hola</Text>
      </View>
      // <ScrollView
      //   showsVerticalScrollIndicator={false}
      //   style={{
      //     width: '100%',
      //     height: '100%',
      //   }}>
      //   <View
      //     style={{
      //       width: '100%',
      //       height: '100%',
      //       backgroundColor: 'white',
      //       flexWrap: 'wrap',
      //       flexDirection: 'row',
      //       paddingVertical: 5,
      //       justifyContent: 'space-between',
      //     }}>
      //     {squares}
      //   </View>
      // </ScrollView>
    );
  };
  const Video = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };
  const Tags = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName='Posts'
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = focused ? 'apps' : 'apps-outline';
            colour = focused ? 'black' : 'gray';

          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart-sharp' : "heart-outline";
            colour = focused ? 'black' : 'gray';
          } 

          return <Ionicons name={iconName} color={colour} size={22} />;
        },
      })}>
      <Tab.Screen name="Posts" component={InventoryScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>








  );
};

export default BottomTabView;
