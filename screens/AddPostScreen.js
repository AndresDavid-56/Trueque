import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import Constants from "expo-constants";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

import { addDoc, collection } from '../firebase-cometchat/firebase';
import firebase from 'firebase/compat';
import { database } from '../firebase-cometchat/firebase';
import uploadImageFromDevice from '../other/uploadImageFromDevice';
import getBlobFromUri from '../other/getBlobFromUri';
import manageFileUpload from '../other/manageFileUpload';
import FormInput from '../components/FormInput';
import FormDesc from '../components/FormDesc';

import {
  SubmitBtn,
  SubmitBtnText,
} from './styles/AddPost';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../components/ProfileBody';
import { RefreshControl } from 'react-native';
import Field2 from '../components/Field2';
import Field3 from '../components/Field3';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const AddPostScreen = ({ navigation }) => {
  const user = firebase.auth().currentUser;


  const [imgURI, setImageURI] = React.useState(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState("");
  const [nameImg,setNameImg]=React.useState("");

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
  const onName=(postImgName)=>{
    setNameImg(postImgName);

  }
  const handleCloudImageUpload = async () => {
    if (!imgURI) return;

    let fileToUpload = null;

    const blob = await getBlobFromUri(imgURI);

    await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail, onName});
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  //Subir Post

  const submitPost = async () => {

      const imageName=nameImg;
      const imageUrl = remoteURL;
      console.log('Image Name: ',imageName);
      console.log('Image Url: ', imageUrl);
      console.log('Titulo: ', titulo);
      console.log('Descripción: ', desc);

      if (!imageUrl || !titulo || !desc) {
        alert('Todos los campos deben ser llenados con información válida');
      } else {
        //Conexión firebase con db products
        await addDoc(collection(database, 'products'), {
          userId: user.uid,
          userName: user.email,
          titulo: titulo,
          desc: desc,
          postImg: imageUrl,
          nameImage:imageName,
          postTime: new Date(),
          timestamp: new Date().getTime(),
        });
        alert('¡Tu producto ha sido publicado con éxito!');
        setTitulo('');
        setDesc('');
        setRemoteURL(null);
        setImageURI(null);
      }





  };


  return (
    <KeyboardAwareScrollView style={{backgroundColor:COLORS.white}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}>

      <View style={styles.container}>
      <Text
          style={{
            color: 'black',
            fontSize: 40,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          ¡Publica tu producto!
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          1.-Añade una imagen
        </Text>
        {Boolean(imgURI) && (
          <View>
            <Image
              source={{ uri: imgURI }}
              resizeMode="contain"
              style={{ width, height: width }}
            />
          </View>
        )}

        {/* {!isUploading && ( */}
        
        <View style={styles.row}>
          
          <MaterialIcons
            name={imgURI? "published-with-changes":"add-a-photo"}
            size={36}
            color={imgURI ? "green" : "black"}
            onPress={handleLocalImageUpload}
          />

          {/* {Boolean(imgURI) && (
              <Feather
                name="upload-cloud"
                size={36}
                color="black"
                onPress={handleCloudImageUpload}
              />
            )} */}
        </View>
        {/* )} */}



        {/* {Boolean(remoteURL) && ( */}
        <View style={{ paddingVertical: 20 }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          2.-Llena los siguientes campos
        </Text>

        <Field2 placeholder="Nombre del producto" value={titulo} 
            onChangeText={(content) => setTitulo(content)}>

        </Field2>
        <Field3 placeholder="Describe el producto" value={desc}
            onChangeText={(content) => setDesc(content)} multiline>

        </Field3>
          {/* <FormInput placeholder="Nombre del producto"
            multiline
            numberOfLines={4}
            iconType="title"
            value={titulo}
            onChangeText={(content) => setTitulo(content)}>
          </FormInput>
          <FormDesc placeholder="Describe el Producto"
            multiline
            numberOfLines={4}
            iconType="description"
            value={desc}
            onChangeText={(content) => setDesc(content)}>
          </FormDesc> */}
          {!isUploading && (

            <View>

              {Boolean(imgURI) && (

                <SubmitBtn onPress={handleCloudImageUpload} onChangeText={(content)=>setD}>
                  <SubmitBtnText> Publicar </SubmitBtnText>
                </SubmitBtn>
                
              )}
              
             {Boolean(remoteURL)&&(
              <><Text onLayout={submitPost}> </Text>


              </>

              )}
            </View>

          )}
          {isUploading && (

            <View style={styles.uploadProgressContainer} >
              <Text> Progreso {progress} de 100% </Text>
              

            </View>

          )}
        </View>
        {/* )} */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: COLORS.white,
    padding:8,
    paddingBottom:100
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
