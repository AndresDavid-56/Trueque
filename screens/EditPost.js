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
import firebase from 'firebase/compat';
import { initializeApp } from 'firebase/compat';
import { firebaseConfig,doc,database,updateDoc } from '../firebase-cometchat/firebase';
import FormButton from '../components/FormButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../components/FormInput';
import { SubmitBtn } from './styles/AddPost';
import { SubmitBtnText } from './styles/AddPost';


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
  const [titulos, setTitulo] = React.useState('');
  const [descr, setDesc] = React.useState('');


  const onEdit = () => {
    const docRef = doc(database, "products", id);
    updateDoc(docRef, {
      titulo: titulos,
      desc: descr

    })
  }

  initializeApp(firebaseConfig);
  const user = firebase.auth().currentUser
  const navigation=useNavigation()






  return (
    <KeyboardAwareScrollView>

      <View style={styles.container}>
        

          <View style={{ paddingVertical: 20 }}>

            {/*<Image source={null}
              resizeMode="contain"
              style={{ width, height: width }}>
  </Image>*/}
            <Text style={styles.heading}>¡Editemos tu producto!</Text>
            <FormInput placeholder="Nombre del producto"
              multiline
              numberOfLines={4}
              iconType="camera"
              defaultValue={titulo}
              onChangeText={(content) => setTitulo(content)}>
            </FormInput>
            <FormInput placeholder="Describe el Producto"
              multiline
              numberOfLines={4}
              iconType="form"
              defaultValue={desc}
              
              onChangeText={(content) => setDesc(content)}>
            </FormInput>
            <SubmitBtn onPress={onEdit}>
              <SubmitBtnText>Editar</SubmitBtnText>
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
      paddingTop: Constants.statusBarHeight,
      backgroundColor: COLORS.primary,
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
  });