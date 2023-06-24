import * as React from 'react';
import * as RN from 'react-native';
import { database, collection, onSnapshot, orderBy, query, where, firebaseConfig } from '../firebase-cometchat/firebase';
import InventoryProduct from '../components/InventoryProduct';
import { View } from 'react-native';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat';
import { COLORS } from '../components/ProfileBody';
import InventoryProductEdit from '../components/InventoryProductEdit';




const InventoryEditScreen = ({route}) => {
    const [invproducts, setinvProducts] = React.useState([]);
    firebase.initializeApp(firebaseConfig);
    const user = firebase.auth().currentUser;
    console.log(user.email);
    const { itemId } = route.params;
    
    console.log('ID: ',itemId);



    React.useEffect(() => {
        const collectionRef = collection(database, 'products');
        const q = query(collectionRef, where(firebase.firestore.FieldPath.documentId(), '==',itemId));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setinvProducts(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    userId: doc.data().userId,
                    userName: doc.data().userName,
                    titulo: doc.data().titulo,
                    desc: doc.data().desc,
                    postImg: doc.data().postImg,
                    nameImage:doc.data().nameImage,
                    postTime: doc.data().postTime,
                    timestamp: doc.data().timestamp,

                }))
            );
        })

        return unsuscribe;
    }, [])

    return (
        <>
   
                <RN.ScrollView >


                    {invproducts.map(products => <InventoryProductEdit key={products.id}{...products}></InventoryProductEdit>)}

                </RN.ScrollView>


        </>
    )


};
export default InventoryEditScreen
const styles = RN.StyleSheet.create({
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
        marginHorizontal: 20
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
});