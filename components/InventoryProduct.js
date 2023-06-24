import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView,TouchableOpacity} from 'react-native';
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
import { COLORS } from './ProfileBody';
import { FeedStack } from '../other/AppStack';



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

    const Producto = ({props}) => {

        return (

            <View
                style={styles.feedItem}>
                <View>
                    <View>

                        <TouchableOpacity onPress={() => navigation.navigate('InventoryEditScreen',{ itemId: id })}>
                        

                        <Image source={{ uri: postImg }} style={{
                            width: 130,
                            height: 150,
                            marginVertical: 0.5,
                            backgroundColor: 'white',


                        }} resizeMode="contain" >

                        </Image></TouchableOpacity>
                    </View>
                </View>
            </View>
        );


    }
 


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
        <Producto></Producto>
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
        marginHorizontal: 16,
    
    },
    feedItem: {
        paddingVertical: 5,
        marginVertical: 0.5,
        justifyContent:'space-between',

        width:130,
        height:150
        
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
