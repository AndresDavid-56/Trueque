import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Alert } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { firebaseConfig } from '../firebase-cometchat/firebase';

import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from '../firebase-cometchat/firebase';

import { provider, signInWithPopup} from '../firebase-cometchat/firebase'
import { initializeApp } from 'firebase/app';



const COLORS = { primary: '#fffaf2', white: '#fff', black:'#000000', turquesa:'#0ffff7', green:'#88ffad',grey:'#82877c'};

//import { AuthContext } from '../other/AuthProvider';

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [lastName, setLastName] = React.useState();

    const app=initializeApp(firebaseConfig)
    const auth=getAuth(app);

    const handleCreateAccount=()=>{
        createUserWithEmailAndPassword(auth,email,password,name, lastName)
        .then((userCredential)=>{
           console.log('¡Cuenta creada exitosamente!')
           const user=userCredential.user;
           console.log(user)
           Alert.alert('!Cuenta creada exitosamente!')
  
        })
        .catch(error=>{
           console.log(error)
           Alert.alert(error.message)
        })
     }

   



 

    //const {register} = useContext(AuthContext);
    //Función para iniciar sesión con gmail

    const signInPrompt = () => {
        const auth = getAuth()
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
                console.log(user)
            })
            .catch((error) => console.log(error)
            
            )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Crear Cuenta</Text>
            
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
                buttonTitle="Crear Cuenta"
                onPress={handleCreateAccount}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    Al registrarte, estás aceptando nuestros términos y condiciones{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Términos y condiciones, clickeado!')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Términos de servicio
                    </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> y </Text>
                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                    Política de privacidad
                </Text>
            </View>


            <View>

                <SocialButton
                    buttonTitle="Iniciar Sesión con Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={signInPrompt}
                />
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('LoginScreen1')}>
                    <Text style={styles.navButtonText}>¿Ya tienes una cuenta? Inicia Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: COLORS.black,
    },
    navButton: {
        marginTop: 15,

        alignItems: 'center',
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: COLORS.black,
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        color: 'grey',
    },
});
