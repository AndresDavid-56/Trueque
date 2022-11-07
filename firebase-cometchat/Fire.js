import { firebaseConfig } from "./firebase";
import { storage } from "./firebase";

import firebase from "firebase/compat/app"
import { Alert } from "react-native";
import 'firebase/compat/firestore';
 

class Fire{
   
    
    constructor(){

        firebase.initializeApp(firebaseConfig)
    }
    addPost = async ({ text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri,`photos/${this.uid}/${Date.now()}`);

        return new Promise((res, rej) => {
            firestore()
                .collection("posts")
                .add({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUri
                })
                .then(ref => {
                    res(ref);
                    console.log("Post Added!")
                    Alert.alert("El post ha sido publicado");
                })
                .catch(error => {
                    rej(error);
                    Alert.alert("Error 1233");
                });
        });
    };

    uploadPhotoAsync =(uri,filename)=> {
    
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
               
                snapshot => {},
                err => {
                    rej(err);
                    console.log("rechazooo")
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    console.log("RECHAZADOOOO")
                    res(url);
                }
            );
        });
    };
    get firestore(){
        return firebase.firestore();
    }

    get uid(){
        return (firebase.auth().currentUser||{}).uid;
    }
    get timestamp(){
        return Date.now();
    }
}
Fire.shared=new Fire();
export default Fire;