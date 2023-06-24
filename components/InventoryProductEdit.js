import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { database, storage, deleteObject, ref } from '../firebase-cometchat/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import FormButton from './FormButton';
import { PostImg } from '../screens/styles/FeedStyles';
import EditPost from '../screens/EditPost';
import { Editposteo } from './Editposteo';
import moment from 'moment';
import 'moment/locale/es';

import { useNavigation } from '@react-navigation/native';
import Product from './Product';
import { COLORS } from './ProfileBody';



export default function InventoryProductEdit({
    id,
    userId,
    userName,
    titulo,
    desc,
    postImg,
    nameImage,
    postTime,
    timestamp,


}) {

    const Hola = () => {

        return (

            <View
                style={styles.feedItem}>
                <View>
                    <View>

                        <TouchableOpacity onPress={() => alert('Objeto Clickeado = ' + titulo)}>


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
    const navigation = useNavigation();


    const onDelete = () => {
        const respuesta = false;

        Alert.alert(

            "Eliminar Producto",
            "¿Estás seguro?",
            [
                {
                    text: "Si",
                    onPress: () => eliminarProducto(),


                },
                {
                    text: "No",
                    onPress: () => alert('Tu producto, no se ha eliminado'),
                    style: "cancel"
                }
            ]


        );

        const eliminarProducto = () => {

            
            console.log('NombreImagen',nameImage);
            const imgRef = ref(storage, `images/${nameImage}.jpg`)
            
            
            deleteObject(imgRef).then(() => {
                console.log("Imagen eliminada correctamente");
                const docRef = doc(database, 'products', id);
                deleteDoc(docRef);
                alert('¡El producto se ha eliminado con éxito!');
                
            }).catch((error) => {
                console.log('Algo ha ido mal!');
                alert('El producto no se ha eliminado, ha ocurrido un error');
            })

            


        }




    }





    return (





        <View style={styles.feedItem} >




            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={styles.name}>{titulo}<Text style={styles.timestamp}> • hace {moment(timestamp).fromNow('ss')}</Text> </Text>
                        <Text style={styles.desc}>{desc}</Text>


                    </View>
                    <View>
                        <Ionicons onPress={onDelete} name="trash" size={26} color="#73788B" style={{ marginTop: 5 }} />

                        <Ionicons onPress={() => navigation.navigate('Editposteo', { itemId: id })} name="create" size={24} color="#73788B" style={{ marginTop: 15 }} />

                    </View>
                </View>
                <Image source={{ uri: postImg }} style={styles.postImage} resizeMode="contain" ></Image>
                <Text style={styles.post}>Publicado por: {userName}</Text>



            </View>
        </View>
    )




}
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
        marginTop: 15,
        fontSize: 14,
        color: COLORS.black,
        fontWeight: "500",
        marginRight: 20,
        marginVertical: 10
    },
    postImage: {
        width: undefined,
        height: 300,
        borderRadius: 5,
        marginVertical: 5
    }
});
