import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FormButton from "../components/FormButton";
//import moment from "moment";

// temporary data until we pull from Firebase
const posts = [
    {
        id: "1",
        name: "Usuario T",
        text:
            "Has intercambiado 'Computador Toshiba poco uso' exitosamente",
        timestamp: 1569109273726,
        avatar: require("./src/images/userProfile.png"),
        image: require("./src/images/post15.jpg")
    },
];

export default class Trueques extends React.Component {
    renderPost = post => {
        return (
            <View style={styles.feedItem} >
                <Image source={post.avatar} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            {/*<Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>*/}
                        </View>

                        <Ionicons name="ellipsis-horizontal-outline" size={24} color="#73788B" />
                    </View>
                    <Text style={styles.post}>{post.text}</Text>
                    <Image source={post.image} style={styles.postImage} resizeMode="cover" />
                    <Text style={styles.post}>Calificación: 9.9/10</Text>

                </View>
            </View >
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.feed}
                    data={posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>
        );
    }
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
        paddingRight: 20,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16,
        marginHorizontal: 40,
        marginLeft: 0,
    }
});
