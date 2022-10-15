import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { provider, signInWithPopup, getAuth } from '../firebase-cometchat/firebase'
import LoginScreen1 from './LoginScreen';

//import {AuthContext} from '../navigation/AuthProvider';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

 

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

            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText="Confirmar Contraseña"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Crear Cuenta"
                onPress={() => alert('Crear Cuenta Clickeado')}
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
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,

        alignItems: 'center',
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Kufam-SemiBoldItalic',
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
        fontFamily: 'Kufam-SemiBoldItalic',
        color: 'grey',
    },
});
