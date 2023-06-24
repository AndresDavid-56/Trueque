import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, doc, database, updateDoc } from '../firebase-cometchat/firebase';
import FormButton from '../components/FormButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../components/FormInput';
import { SubmitBtn } from './styles/AddPost';
import { SubmitBtnText } from './styles/AddPost';
import FormDesc from '../components/FormDesc';
import Field2 from '../components/Field2';
import Field3 from '../components/Field3';


import Constants from "expo-constants";
import { COLORS } from '../components/ProfileBody';
import { useNavigation } from '@react-navigation/native';




export default function EditPost({

  id,
  userId,
  userName,
  titulo,
  desc,
  postImg,
  postTime,
  timestamp,

}) {
  const [titulos, setTitulo] = React.useState(titulo);
  const [descr, setDesc] = React.useState(desc);


  const onEdit = () => {
    if (!titulos || !descr) {
      alert('Algunos campos se encuentran vacíos');
    } else {
      const docRef = doc(database, "products", id);
      updateDoc(docRef, {
        titulo: titulos,
        desc: descr

      })
      alert('¡Producto Actualizado!')

    }

  };

  firebase.initializeApp(firebaseConfig);
  //const user = firebase.auth().currentUser;
  //const navigation=useNavigation();






  return (
    <KeyboardAwareScrollView>

      <View style={styles.container}>


        <View style={{ paddingVertical: 20 }}>

          <Image source={{ uri: postImg }}
            resizeMode="contain"
            style={styles.postImage}>
          </Image>
          <Text style={styles.heading}>¡Editemos tu producto!</Text>
          <Field2 placeholder="Nombre del producto"
            iconType="title"
            defaultValue={titulo}
            onChangeText={(content) => setTitulo(content)}>
          </Field2>
          <Field3 placeholder="Describe el Producto"
            multiline
            iconType="description"
            defaultValue={desc}

            onChangeText={(content) => setDesc(content)}>
          </Field3>
          <SubmitBtn onPress={onEdit}>
            <SubmitBtnText>Actualizar</SubmitBtnText>
          </SubmitBtn>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 150,
    paddingBottom:300,
    backgroundColor: COLORS.white,
    padding: 8,
  },

  row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  uploadProgressContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    margin: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  postImage: {
    width: undefined,
    height: 300,
    borderRadius: 5,
    marginVertical: 5
}
});