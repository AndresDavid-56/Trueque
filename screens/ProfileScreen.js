import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ProfileBody, ProfileButtons } from '../components/ProfileBody';
//import Entypo from 'react-native-vector-icons/Entypo';
//import BottomTabView from '../components/BottomTabView';
import firebase from 'firebase/compat';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from '../firebase-cometchat/firebase';


import MessagesScreen from './MessagesScreen';
import Trueques from './Trueques';
const COLORS = { primary: '#fffaf2', white: '#fff', black: '#000000', turquesa: '#0ffff7', green: '#88ffad', grey: '#82877c' };
import { Ionicons } from "@expo/vector-icons";

export default class Profile extends React.Component {

  state = { email: "", displayName: "" };
  componentDidMount() {

    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });

  }




  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.primary }}>
        <View style={{ width: '100%', padding: 10 }}>
      
          <ProfileBody
            name={this.state.email}
            //accountName="mr_peobody"
            profileImage={require('./src/images/userProfile.png')}
            followers="9.9/10"
            following="35"
            post="1"
          />

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
              
            Intercambios realizados
            <Ionicons name="checkmark-circle" style={{ fontSize: 15, color: 'green', }}></Ionicons>
           
          </Text>
          {/*
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          {circuls}
        </ScrollView>*/}
        </View>
        <Trueques></Trueques>

        {/*<BottomTabView />*/}
      </View >
    );
  };
};



