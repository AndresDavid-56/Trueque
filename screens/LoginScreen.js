import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';


import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { firebaseConfig } from '../firebase-cometchat/firebase';

import { signInWithEmailAndPassword } from '../firebase-cometchat/firebase';

import { createUserWithEmailAndPassword, addDoc, collection } from '../firebase-cometchat/firebase';

import { provider, signInWithPopup, database, getAuth } from '../firebase-cometchat/firebase'
import { initializeApp } from 'firebase/app';
import { COLORS } from '../components/ProfileBody';
import InputField from '../components/InputField';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import CustomButton from '../components/CustomButton';

import { darkGreen } from '../components/Constants';
import Field from '../components/Field';
import Btn from '../components/Btn';



const LoginScreen1 = ({ navigation }) => {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');


   const app = initializeApp(firebaseConfig)
   const auth = getAuth(app);

   const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            console.log('Ingreso exitoso')
            const user = userCredential.user;
            console.log(user)
            navigation.navigate('AppStack');
            Alert.alert('Bienvenido ' + email)

         })
         .catch(error => {
            console.log(error)
            alert('Nombre de usuario o contraseña incorrecta');
         })
   }








   //Función para iniciar sesión con gmail

   const signInPrompt = () => {
      const auth = getAuth()
      signInWithPopup(auth, provider)
         .then((result) => {
            const user = result.user
            console.log(user)
            navigation.navigate('AppStack');
            //agrega usuario a firestore
            const Users = async () => {
               await addDoc(collection(database, 'users'), {
                  userId: user.uid,
                  email: user.email,
                  name: user.displayName,
                  lastName: "",
                  createdAt: new Date(),
               });
            }
            Users();
         })
         .catch((error) => console.log(error))
   }


   return (

      <View style={{alignItems: 'center', width: 420, backgroundColor:darkGreen}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Iniciar Sesión
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 650,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 10,
            alignItems: 'center',
          }}>
            <View style={{ alignItems: 'center' }}>
               <Image
                  source={require('../screens/src/images/Logo_PNG_T.png')}
                  style={styles.logo} />
            </View>
          <Text style={{fontSize: 30, color: darkGreen, fontWeight: 'bold'}}>
            ¡Bienvenido!
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Inicia sesión con tu cuenta
          </Text>
          <Field
          label={email}
            placeholder="Email"
            keyboardType={'email-address'}
            onChangeText={(userEmail) => setEmail(userEmail)}
            autoCapitalize='none'
          />
          <Field label={password} placeholder="Contraseña" secureTextEntry={true} onChangeText={(userPassword) => setPassword(userPassword)} />
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Iniciar Sesión" Press={handleSignIn} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>¿Eres nuevo? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}> Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>);
      {/* <View style={{ flex: 1, justifyContent: 'center' }} >
         <View style={{ paddingHorizontal: 25 }} >
            <View style={{ alignItems: 'center' }}>
               <Image
                  source={require('../screens/src/images/Logo1.png')}
                  style={styles.logo} />
            </View>
            <Text
               style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 28,
                  fontWeight: '500',
                  color: '#333',
                  marginBottom: 30,
               }}>
               Iniciar Sesión
            </Text>

            <InputField
               label={email}
               placeholderText='Correo electrónico'
               onChangeText={(userEmail) => setEmail(userEmail)}
               
               
               
               

               icon={
                  <MaterialIcons
                     name="mail-outline"
                     size={20}
                     color="#666"
                     style={{ marginRight: 5 }}
                  />}
               keyboardType="email-address"

               autoCorrect={false}
            />
            <InputField
               label={password}
               onChangeText={(userPassword) => setPassword(userPassword)}
               placeholderText='Contraseña'
               icon={
                  <Ionicons
                     name="ios-lock-closed-outline"
                     size={20}
                     color="#666"
                     style={{ marginRight: 5 }}
                  />}
               inputType="password"
            />
            <View>
            </View>
            <CustomButton

               label={"Iniciar Sesión"}
               onPress={handleSignIn}
            />
            <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
               O, inicia sesión con Gmail
            </Text>
            <View style={{
               flexDirection:'row',
               justifyContent: 'center',
               marginBottom: 30,
            }}>


               <TouchableOpacity
                  onPress={signInPrompt}
                  style={{
                     borderColor: '#ddd',
                     borderWidth: 2,
                     borderRadius: 10,
                     paddingHorizontal: 30,
                     paddingVertical: 10,
                     width: 90,
                  }}>

                  <Image source={require('./src/images/Goggle.png')} style={{ height: 24, width: 24 }}></Image>
               </TouchableOpacity>
            </View>
            <View
               style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 30,
               }}>
               <Text>¿Eres nuevo?</Text>
               <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                  <Text style={{ color: COLORS.black, fontWeight: '700' }}> Registrate</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View > */}
};
export default LoginScreen1

const styles = StyleSheet.create({
   container: {
      backgroundColor: COLORS.white,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   },
   logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',

   },
   text: {
      //fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
   },
   navButton: {
      marginTop: 15,
   },
   forgotButton: {
      marginVertical: 35,
   },
   navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: COLORS.black,
      //fontFamily : 'Lato-Regular' ,
   },
   errorMessage:
   {
      height: 72,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30
   },

   error: {
      color: "#E9446A",
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center"
   },



});