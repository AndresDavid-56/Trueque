import { StatusBar } from 'expo-status-bar'
import { SimpleLineIcons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import {
  getAuth,
  signOut,
  collection,
  getFirestore,
  onSnapshot,auth,database,where, query} from '../firebase-cometchat/firebase'
import { useNavigation } from '@react-navigation/native'
import { darkGreen } from '../components/Constants'
import firebase from 'firebase/compat';
import { verifyPasswordResetCode } from 'firebase/auth'


const ChatsScreen=({navigation, route})=>{
  const [chats, setChats] = useState([]);

  const user=getAuth().currentUser;
  const userUid=user? user.uid:null;
  console.log("User Id: ",userUid);
  useEffect(() => {
    const q = query(collection(database, 'chats'),where('uActual', '==', firebase.auth().currentUser.email)&&where('id','==',firebase.auth().currentUser.uid)) ;
    onSnapshot(q, (snapshot) => {
      setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [userUid]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Mensajes',
      headerStyle: { backgroundColor: darkGreen },
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            width: 120,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white'
          }}
        >
          
        </View>
      ),
    })
  }, [navigation])

  const enterChat = (uIS,chatName) => {
    navigation.navigate('MessagesScreen', {
      uIS,
      chatName
    })
    console.log("ID VERIFICABLE: ",id)
    console.log("CHATNAME;", chatName)
  }


  return (
    <SafeAreaView>
    <StatusBar style='dark' />
    <ScrollView style={styles.container}>
      {chats.map(({ chatName,id,v}) => (
        <CustomListItem
          key={id}
          id={v}
          chatName={chatName}
          enterChat={enterChat}
        />
      ))}
    </ScrollView>
  </SafeAreaView>
    
  )
  

}

export default ChatsScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})