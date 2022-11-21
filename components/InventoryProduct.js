import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { database } from '../firebase-cometchat/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import FormButton from './FormButton';
import { PostImg } from '../screens/styles/FeedStyles';
import EditPost from '../screens/EditPost';
import { Editposteo } from './Editposteo';
import moment from 'moment';
import 'moment/locale/es';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Product from './Product';



export default function InventoryProduct({
    id,
    userId,
    userName,
    titulo,
    desc,
    postImg,
    postTime,
    timestamp,


}) {
    const navigation = useNavigation();


    const onDelete = () => {

        const respuesta = confirm('¿Estás seguro de eliminar tu producto?, no se podrá recuperar')

        if (respuesta) {
            const docRef = doc(database, 'products', id);
            deleteDoc(docRef);
            alert('¡El producto se ha eliminado con éxito!');
        } else {
            alert('Tu producto, no se ha eliminado');
        }

    }



    return (

        <View style={styles.feedItem} >




            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>


                        <Text style={styles.name}>{titulo}</Text>

                        <Text style={styles.timestamp}>hace {moment(timestamp).fromNow('ss')}</Text>


                    </View>
                    <View>
                        <Ionicons onPress={onDelete} name="trash" size={26} color="#73788B" style={{ marginTop: 5 }} />

                        <Ionicons onPress={() => navigation.navigate('Editposteo', { itemId: id })} name="create" size={24} color="#73788B" style={{ marginTop: 15 }} />


                    </View>
                </View>
                <Text style={styles.post}>{desc}</Text>
                <Image source={{ uri: postImg }} style={styles.postImage} resizeMode="contain" ></Image>
                <Text style={styles.post}>Publicado por: {userName}</Text>

                <View style={{ flexDirection: "row", paddingRight: 40 }}>



                    {/*
                            <Ionicons name="heart-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
            <Ionicons name="chatbubbles-outline" size={24} color="#73788B" />*/}
                </View>

            </View>
        </View>
    )




}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
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
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 25,
        fontWeight: "500",
        color: "#454D65",
        marginLeft: 20,
        marginTop: 10
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4,
        marginLeft: 20
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899",
        marginLeft: 20
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
});
