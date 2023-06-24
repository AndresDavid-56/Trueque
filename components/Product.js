import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import FormButton from './FormButton';
import moment from 'moment';
import 'moment/locale/es';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat';
import { COLORS } from './ProfileBody';
import { useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot, doc, setDoc,getDoc
} from 'firebase/firestore';
import { auth, database } from '../firebase-cometchat/firebase';


export default function Product({
    id,
    userId,
    userName,
    titulo,
    desc,
    postImg,
    postTime,
    timestamp,
    userName_User,


}) {

    const navigation = useNavigation();
    const idU=doc(collection(database,'chats')).id
   






    return (
        <View style={styles.feedItem} >

            {/* <Image source={require('../screens/src/images/ImageUser.png')} style={styles.avatar} /> */}
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={styles.name}>{titulo}<Text style={styles.timestamp}> • hace {moment(timestamp).fromNow('ss')}</Text> </Text>


                        <Text style={styles.desc}>{desc}</Text>
                    </View>
                </View>

                <Image source={{ uri: postImg }} style={styles.postImage} resizeMode='contain' ></Image>

                <Text style={styles.post}>Publicado por: {userName}</Text>
                {Boolean(firebase.auth().currentUser.email == userName) &&
                <Text style={styles.post}>Este producto es tuyo</Text>
                
                
                }

                <View style={{ flexDirection: "row", paddingRight: 40 }}>

                    {Boolean(firebase.auth().currentUser.email != userName) &&
                        <FormButton buttonTitle="Intercambiar"
                            onPress={() => {
                                navigation.navigate('MessagesScreen', {
                                    id: id,
                                    id_c: userId,
                                    name: userName,
                                    nameP: titulo,
                                    uAct: firebase.auth().currentUser.email,
                                    uIS: idU
                                });


                            }}
                        ></FormButton>}

                    {/*                         <Ionicons name="heart-outline" size={24} color="#73788B" style={{ marginLeft: 40, paddingVertical: 25 }} /> */}
                </View>

            </View>
        </View>
    )
}
/*
*/

/*
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    feed: {
        marginHorizontal: 20
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 0,
        padding: 15,
        flexDirection: "row",
        marginVertical: 0.3
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
        borderWidth: 0.2
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.black
    },
    timestamp: {
        fontSize: 16,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 10,
        fontSize: 14,
        color: "#838899"
    },
    desc: {
        marginTop: 10,
        fontSize: 14,
        color: COLORS.black,
        fontWeight: "500"
    },
    postImage: {
        width: undefined,
        height: 300,
        borderRadius: 5,
        marginVertical: 5
    }
});
