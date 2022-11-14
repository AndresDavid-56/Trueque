import React from 'react';
import { View, Text, Image} from 'react-native';
import { ProfileButtons } from '../components/ProfileBody';
import ProfileBody from '../components/ProfileBody';
import InventoryScreen from './InventoryScreen';
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from 'react-native';
import firebase from 'firebase/compat/app';
import { collection, database, firebaseConfig } from '../firebase-cometchat/firebase';
import { initializeApp } from 'firebase/app';

import EditProfile from './EditProfile';
import InfProfile from '../components/InfProfile';


const COLORS = { primary: '#fffaf2', white: '#fff', black: '#000000', turquesa: '#0ffff7', green: '#88ffad', grey: '#82877c' };


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





  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.primary }}>
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
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>1</Text>
              <Text>Trueques</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>9.9</Text>
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
          <Ionicons name="checkmark-circle" style={{ fontSize: 15, color: 'green', }}></Ionicons>

        </Text>

      </View>
      <ScrollView style={{ backgroundColor: COLORS.green }} showsVerticalScrollIndicator={false}>

        <InventoryScreen></InventoryScreen>
      </ScrollView>
    </View >
  );
};



