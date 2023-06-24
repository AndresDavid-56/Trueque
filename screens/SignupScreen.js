import React from 'react';
import Field from '../components/Field';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { firebaseConfig, updateProfile } from '../firebase-cometchat/firebase';
import { darkGreen } from '../components/Constants';
import Btn from '../components/Btn';

import { getAuth, createUserWithEmailAndPassword, addDoc, collection } from '../firebase-cometchat/firebase';

import { provider, signInWithPopup, database } from '../firebase-cometchat/firebase'
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat';




const COLORS = { primary: '#5379a4', white: '#fff', black: '#000000', turquesa: '#0ffff7', green: '#88ffad', grey: '#82877c' };



const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [lastName, setLastName] = React.useState();

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);


    const handleCreateAccount = () => {
        if (!name || !email || !password || !lastName) {
            alert('Todos los campos deben ser llenados')
        } else {
            createUserWithEmailAndPassword(auth, email, password, name, lastName)
                .then((userCredential) => {
                    console.log('¡Cuenta creada exitosamente!')

                    const user = userCredential.user
                    updateProfile(user,{
                        displayName:name
                    }).then((s)=>{
                        console.log("Perfil Modificado");
                    })

                    

                
                    
                    
                    const Users = async () => {
                        await addDoc(collection(database, 'users'), {
                            userId: user.uid,
                            email: user.email,
                            name: name,
                            lastName: lastName,
                            createdAt: new Date(),
                        });
                    }
                    Users();

                    console.log("Usuario creado:", user)
                    alert('¡Cuenta creada exitosamente!')

                })
                .catch(error => {
                    console.log(error)
                    alert('Lo sentimos, debes rellenar los campos con información válida');
                })
        }
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
        <View style={{alignItems: 'center', width: 440, backgroundColor:darkGreen}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Regístrate
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Crear una nueva cuenta
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 600,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field placeholder="Nombres" labelValue={name}
                onChangeText={(userName) => setName(userName)} />
          <Field placeholder="Apellidos" labelValue={lastName}
                onChangeText={(lastName) => setLastName(lastName)} />
          <Field
            placeholder="Email"
            keyboardType={'email-address'}
            labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                autoCapitalize='none'
          />
          <Field placeholder="Contraseña" secureTextEntry={true} labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16
            }}>
         
          </View>

          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Crear cuenta"
            Press={ handleCreateAccount
            }
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              ¿Ya tienes una cuenta?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen1')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Inicia Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );



        {/* <View style={styles.container}>
            <Text style={styles.text}>Crear Cuenta</Text>
            <FormInput
                labelValue={name}
                onChangeText={(userName) => setName(userName)}
                placeholderText="Nombre"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={lastName}
                onChangeText={(lastName) => setLastName(lastName)}
                placeholderText="Apellido"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="mail"
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
            <View>
            <Text style={{marginRight:150}}>(Mínimo 6 caracteres)</Text></View>

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
        </View> */}
    
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
