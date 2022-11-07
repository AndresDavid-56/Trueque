import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
} from 'react-native';
import Constants from "expo-constants";
import { AntDesign, Feather } from "@expo/vector-icons";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, firebaseConfig, getFirestore, storage } from '../firebase-cometchat/firebase';
import firebase from 'firebase/compat';
import { database } from '../firebase-cometchat/firebase';
import uploadImageFromDevice from '../other/uploadImageFromDevice';
import getBlobFromUri from '../other/getBlobFromUri';
import manageFileUpload from '../other/manageFileUpload';
import FormInput from '../components/FormInput';




import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from './styles/AddPost';
import { TouchableOpacity } from 'react-native';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import * as FileSystem from 'expo-file-system'
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Timestamp } from 'firebase/firestore';
import { number } from 'prop-types';
import { COLORS } from '../components/ProfileBody';






//import { AuthContext } from '../navigation/AuthProvider';


const AddPostScreen = ({ navigation }) => {
  //const {user, logout} = useContext(AuthContext);
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




  /*
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);*/







  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = async () => {


    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,

    });
    console.log(result);

    if (!result.cancelled) {

      const source = result.uri;
      setImage(source);
      console.log("Source: ", source);
      console.log("URL:", uploadImage());

    }



  }









  const submitPost = async () => {
    const imageUrl = remoteURL;
    console.log('Image Url: ', imageUrl);
    console.log('Titulo: ', titulo);
    console.log('Descripción: ', desc);
  
 


    await addDoc(collection(database, 'products'), {
      userId: user.uid,
      userName: user.email,
      titulo: titulo,
      desc: desc,
      postImg: imageUrl,
      postTime: new Date(),
      timestamp: new Date().getTime(),
    });
    /*
    
    onSend.then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  async function uploadImage(imageUrl) {
    try{
      const response =await fetch(imageUrl);
      const blob=await response.blob();
      const reference=ref(storage,`images/`);
      const result=await uploadBytes(reference,blob);
      const url= await getDownloadURL(result.ref);
      console.log("URLLL:",url);

      return url

    }catch(err){
      return Promise.reject(err);
    }*/




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
            {/*

          <Text>
            Image has been uploaded at
            <Text style={{ color: "blue" }}> {remoteURL} </Text>
      </Text>*/}
          </View>
        )}
      </View></KeyboardAwareScrollView>
    /*
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('TRUEQUE')}>
        <Text>ATRÁS</Text>
      </TouchableOpacity>
      <InputWrapper>
        {image != null ? <AddImage source={{ uri: image }} /> : null}

        <InputField
          placeholder="Describe el Producto"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>*/
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
  /*
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },*/
});
