import React, { useState } from 'react';
import {  StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';


import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { firebaseConfig } from '../firebase-cometchat/firebase';

import {  signInWithEmailAndPassword} from '../firebase-cometchat/firebase';

import { provider, signInWithPopup, getAuth } from '../firebase-cometchat/firebase'
import { initializeApp } from 'firebase/app';
const COLORS = { primary: '#fffaf2', white: '#fff', black: '#000000', turquesa: '#0ffff7', green: '#88ffad', grey: '#82877c' };



const LoginScreen1 = ({ navigation }) => {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');


   const app=initializeApp(firebaseConfig)
   const auth=getAuth(app);

   const handleSignIn=()=>{
      signInWithEmailAndPassword(auth, email,password)
      .then((userCredential)=>{
         console.log('Ingreso exitoso')
         const user=userCredential.user;
         console.log(user)
         navigation.navigate('AppStack');
         Alert.alert('Bienvenido '+email)

      })
      .catch(error=>{
         console.log(error)
      })
   }
   




  


   //Función para iniciar sesión con gmail

   const signInPrompt = () => {
      const auth = getAuth()
      signInWithPopup(auth, provider)
         .then((result) => {
            const user = result.user
            console.log(user)
         })
         .catch((error) => console.log(error))
   }


   return (
      <View style={styles.container} >
         <Image
            source={require('../screens/src/images/Logo1.png')}
            style={styles.logo} />

         <FormInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholderText="Email"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
         />
         <FormInput
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText="Contraseña"
            iconType="lock"
            secureTextEntry={true}
         />
         <FormButton

            buttonTitle="Iniciar Sesión"
            onPress={handleSignIn}
         />
         <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
            <Text style={styles.navButtonText}> ¿Olvidaste tu contraseña? </Text >
         </TouchableOpacity >


         <SocialButton
            buttonTitle="Iniciar Sesión con Gmail"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={signInPrompt} />
         <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.navButtonText}>
               ¿No tienes cuenta? Créala aquí
            </Text>
         </TouchableOpacity>
      </View >
   );
};
export default LoginScreen1

const styles = StyleSheet.create({
   container: {
      backgroundColor: COLORS.primary,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   },
   logo: {
      height: 200,
      width: 200,
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