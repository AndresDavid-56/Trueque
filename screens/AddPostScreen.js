import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import Constants from "expo-constants";
import { AntDesign, Feather } from "@expo/vector-icons";
import { addDoc, collection } from '../firebase-cometchat/firebase';
import firebase from 'firebase/compat';
import { database } from '../firebase-cometchat/firebase';
import uploadImageFromDevice from '../other/uploadImageFromDevice';
import getBlobFromUri from '../other/getBlobFromUri';
import manageFileUpload from '../other/manageFileUpload';
import FormInput from '../components/FormInput';

import {
  SubmitBtn,
  SubmitBtnText,
} from './styles/AddPost';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../components/ProfileBody';



const AddPostScreen = ({ navigation }) => {
  const user = firebase.auth().currentUser;


  const [imgURI, setImageURI] = React.useState(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState("");

  const [error, setError] = React.useState(null);
  const { width } = useWindowDimensions();
  const [titulo, setTitulo] = useState(null);
  const [desc, setDesc] = useState(null);

  const handleLocalImageUpload = async () => {
    const fileURI = await uploadImageFromDevice();

    if (fileURI) {
      setImageURI(fileURI);
    }
  };

  const onStart = () => {
    setIsUploading(true);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onComplete = (fileUrl) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    setImageURI(null);
  };

  const onFail = (error) => {
    setError(error);
    setIsUploading(false);
  };
  const handleCloudImageUpload = async () => {
    if (!imgURI) return;

    let fileToUpload = null;

    const blob = await getBlobFromUri(imgURI);

    await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail });
  };


  //Subir Post

  const submitPost = async () => {
    const imageUrl = remoteURL;
    console.log('Image Url: ', imageUrl);
    console.log('Titulo: ', titulo);
    console.log('Descripción: ', desc);

    //Conexión firebase con db products




    await addDoc(collection(database, 'products'), {
      userId: user.uid,
      userName: user.email,
      titulo: titulo,
      desc: desc,
      postImg: imageUrl,
      postTime: new Date(),
      timestamp: new Date().getTime(),
    });




  };


  return (
    <KeyboardAwareScrollView>

      <View style={styles.container}>
        <Text style={styles.heading}>Para empezar, sube la imagen del producto que deseas añadir</Text>
        {Boolean(imgURI) && (
          <View>
            <Image
              source={{ uri: imgURI }}
              resizeMode="contain"
              style={{ width, height: width }}
            />
          </View>
        )}

        {!isUploading && (
          <View style={styles.row}>
            <AntDesign
              name="addfile"
              size={36}
              color={imgURI ? "green" : "black"}
              onPress={handleLocalImageUpload}
            />

            {Boolean(imgURI) && (
              <Feather
                name="upload-cloud"
                size={36}
                color="black"
                onPress={handleCloudImageUpload}
              />
            )}
          </View>
        )}

        {isUploading && (
          <View style={styles.uploadProgressContainer}>
            <Text> Progreso {progress} of 100% </Text>
          </View>
        )}

        {Boolean(remoteURL) && (
          <View style={{ paddingVertical: 20 }}>

            <Image source={{ uri: remoteURL }}
              resizeMode="contain"
              style={{ width, height: width }}>
            </Image>
            <Text style={styles.heading}>Ahora, ¡empecemos!</Text>
            <FormInput placeholder="Nombre del producto"
              multiline
              numberOfLines={4}
              iconType="camera"
              value={titulo}
              onChangeText={(content) => setTitulo(content)}>
            </FormInput>
            <FormInput placeholder="Describe el Producto"
              multiline
              numberOfLines={4}
              iconType="form"
              value={desc}
              onChangeText={(content) => setDesc(content)}>
            </FormInput>
            <SubmitBtn onPress={submitPost}>
              <SubmitBtnText>Publicar</SubmitBtnText>
            </SubmitBtn>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddPostScreen;

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
