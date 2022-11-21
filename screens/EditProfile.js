import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, doc, database, updateDoc } from '../firebase-cometchat/firebase';
import FormButton from '../components/FormButton';




export default function EditProfile({

  id,
  userId,
  email,
  name,
  lastName,

}) {

  firebase.initializeApp(firebaseConfig);
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');





  const onEdit = () => {

    if (!nombre || !apellido) {

      alert('Algunos campos que proporcionaste se encuentran vacíos');

    } else {
      const docRef = doc(database, "users", id);
      updateDoc(docRef, {
        name: nombre,
        lastName: apellido

      })
    }
  }


  //const user = firebase.auth().currentUser






  return (

    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>

      </View>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Image
          source={require('./src/images/ImageUser.png')}
          style={{ width: 80, height: 80, borderRadius: 100 }}
        />
        <Text
          style={{
            color: '#3493D9',
          }}>
          {name}

          <Text> </Text>
          {lastName}
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <View>
          <Text
            style={{
              opacity: 0.5,
            }}>
            Nombre
          </Text>
          <TextInput
            placeholder="Nombre"
            defaultValue={name}
            onChangeText={(nombre) => setNombre(nombre)}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
        </View>
        <View>
          <Text
            style={{
              opacity: 0.5,
            }}>
            Apellido
          </Text>
          <TextInput
            placeholder="Apellido"
            defaultValue={lastName}
            onChangeText={(apellido) => setApellido(apellido)}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text
            style={{
              opacity: 0.5,
            }}>
            Email
          </Text>
          <TextInput
            placeholder="Email"
            defaultValue={email}
            editable={false}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#CDCDCD',
            }}
          />
          <FormButton
            buttonTitle="Editar"
            onPress={onEdit}>
          </FormButton>
        </View>
      </View>
    </View>
  );
};

