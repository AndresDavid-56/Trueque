import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Dimensions, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';

import { provider, signInWithPopup, getAuth } from '../firebase-cometchat/firebase'



const LoginScreen1 = ({ navigation }) => {
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();

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
            source={require('../screens/src/images/Logo.png')}
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
            onPress={() => navigation.navigate('')}
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
      backgroundColor: '#f9fafd',
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
      color: '#2e64e5',
      //fontFamily : 'Lato-Regular' ,
   },


});