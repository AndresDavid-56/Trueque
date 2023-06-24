import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { windowHeight,windowWidth } from '../utils/Dimentions';
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

const FormDesc = ({ labelValue, placeholderText, iconType, ...rest }) => {
    return (

        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <MaterialIcons name={iconType} size={25} color="#666" />
            </View >
            <TextInput
                defaultValue={labelValue}
                style={styles.input}
                numberOfLines={4}
                placeholder={placeholderText}
                placeholderTextColor="#666"
                {...rest}
            />
        </View>
    );
};
export default FormDesc;
const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: windowHeight / 5,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        //fontFamily: 'Kufam-SemiBoldItalic',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {


        padding: 5,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.5,
        height: windowHeight / 1.5,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    }
});

