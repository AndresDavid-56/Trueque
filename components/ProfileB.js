import * as React from 'react';
import * as RN from 'react-native';
import { database, collection, onSnapshot, orderBy, query, where,firebaseConfig } from '../firebase-cometchat/firebase';
import InventoryProduct from '../components/InventoryProduct';
import { View } from 'react-native';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import EditProfile from '../screens/EditProfile';
import { ProfileBody } from './ProfileBody';
import ProfileScreen from '../screens/ProfileScreen';

//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth'



export default function ProfileB(){
    const [users, setUsers] = React.useState([]);
    
    //const user=firebase.auth().currentUser;
    firebase.initializeApp(firebaseConfig);
    const user=firebase.auth().currentUser;
  //console.log(user.email);
  //console.log(user.uid)
  



    React.useEffect(() => {
        const collectionRef = collection(database, 'users');
        const q = query(collectionRef, where('userId','==',user.uid));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setUsers(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    userId: doc.data().userId,
                    email: doc.data().email,
                    name: doc.data().name,
                    lastName: doc.data().lastName,

                }))
            );
            
        })

        return unsuscribe;
    }, [])

    return (
        <>
            <RN.ScrollView >
                

                   {users.map(usua => <ProfileScreen key={usua.id}{...usua}></ProfileScreen>)}

            </RN.ScrollView>

        </>
    )


};
