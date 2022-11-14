import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import FormButton from './FormButton';
import moment from 'moment';
import 'moment/locale/es';
import { useNavigation } from '@react-navigation/native';

export default function Product({
    id,
    userId,
      userName,
      titulo,
      desc,
      postImg,
      postTime,
      timestamp,
      userName_User

}){

    const navigation=useNavigation();

        return (
            <View style={styles.feedItem} >

                <Image source={require('../screens/src/images/ImageUser.png')} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>{titulo}</Text>
                            <Text style={styles.timestamp}>hace {moment(timestamp).fromNow('ss')}</Text> 
                        </View>
                    </View>
                    <Text style={styles.post}>{desc}</Text>
                    <Image source={{uri:postImg}} style={styles.postImage} resizeMode="contain" ></Image>
                    <Text style={styles.post}>Publicado por: {userName}</Text>
                    
                    <View style={{ flexDirection: "row", paddingRight: 40 }}>

                        <FormButton buttonTitle="Intercambiar" 
                         onPress={() => {
                            navigation.navigate("ChatScreen",{
                                id: userId,
                                name: userName})
                        }}
                        ></FormButton>

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
        marginRight: 16,
        borderWidth:0.2
    },
    name: {
        fontSize: 25,
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
        height: 300,
        borderRadius: 5,
        marginVertical: 16
    }
});
