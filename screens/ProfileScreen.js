import React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, ScrollView } from 'react-native';
import { ProfileButtons } from '../components/ProfileBody';
import ProfileBody from '../components/ProfileBody';
import InventoryScreen from './InventoryScreen';
import { Ionicons } from "@expo/vector-icons";
import firebase from 'firebase/compat/app';
import FavoritesScreen from './FavoritesScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabView from '../components/BottomTabView';



import { collection, database, firebaseConfig } from '../firebase-cometchat/firebase';
import { initializeApp } from 'firebase/app';
import { func } from 'prop-types';



const COLORS = { primary: '#5379a4', white: '#fff', black: '#000000', turquesa: '#0ffff7', green: '#88ffad', grey: '#82877c' };


export default function ProfileScreen({

  id,
  userId,
  email,
  name,
  lastName,

}) {





  firebase.initializeApp(firebaseConfig);
  const user = firebase.auth().currentUser;
  //  console.log(user.email);
  //  console.log('Nombre1: ', name);
  const Tab = createMaterialTopTabNavigator();

  function Prueba() {
    return (
      <View

        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: 'center',
          backgroundColor: '#03cafc',
        }}

      >
        <Text>
          Pruebaaa!!
        </Text>

      </View>
    )
  }






  return (


    <View style={{ width: Dimensions.get('window').width, height: '210%', backgroundColor: COLORS.white }}>
      
      <View style={{ width: '100%', padding: 10 }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={require('../screens/src/images/ImageUser.png')}
                style={{
                  resizeMode: 'cover',
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  borderWidth: 0.1


                }}
              />
              <Text
                style={{
                  paddingVertical: 5,
                  fontWeight: 'bold',
                }}>
                {name} <Text>{lastName}</Text>
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>0</Text>
              <Text>Trueques</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>0</Text>
              <Text>Calificación</Text>
            </View>
          </View>


        </View>
        {/*
        <ProfileBody
          name={name}
          //accountName="mr_peobody"
          profileImage={require('./src/images/ImageUser.png')}
          followers="9.9/10"
          following="35"
          post="1"
          />*/}

        <ProfileButtons
          id={0}
          name="Mr Peobody"
          accountName="mr_peobody"
          profileImage={require('./src/images/userProfile.png')}
        />
      </View>
      <View>
        <Text
          style={{
            padding: 10,
            letterSpacing: 1,
            fontSize: 14,
          }}>

          Mis productos
          <Ionicons name="checkmark-circle" style={{ fontSize: 15, color: 'green' }}></Ionicons>

        </Text>
      </View>
      <BottomTabView></BottomTabView>
    </View >

  );
};



