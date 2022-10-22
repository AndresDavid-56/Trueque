import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimentions';
const COLORS = { primary: '#fffaf2', white: '#fff', black:'#000000', turquesa:'#0ffff7', green:'#88ffad',grey:'#82877c'};
const FormButton = ({ buttonTitle, ...rest }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}> {buttonTitle} </Text >
        </TouchableOpacity>
    );
};
export default FormButton;
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100 %',
        height: windowHeight / 15,
        backgroundColor: COLORS.green,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        paddingRight:20
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
});