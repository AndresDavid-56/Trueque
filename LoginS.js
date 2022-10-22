import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

import Mail from '../Icon/Mail';
import Lock from '../Icon/Lock';

export default LoginScreem = () => {
    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>{"\n"}!Bienvenido a TRUEQUE!{"\n"}</Text>

            <Button style={styles.boton}
                title="Iniciar sesión con:"
                color="#666666"
                align='center'
            />
            <View style={styles.c2}>
                <Mail />
                <TextInput placeholder='Ingresa tu correo electrónico' />
            </View>

            <View style={styles.c2}>
                <Lock />
                <TextInput placeholder='Ingresa tu contraseña' />
            </View>
            <Button
                title="Iniciar sesión"
                color="#CCE3E4"
            />
            <Text style={styles.subTitle1}>{"\n"}¿Olvidaste tu contraseña?{"\n"}</Text>
            <Text style={styles.subTitle1}>{"\n"}¿No tienes una cuenta?{"\n"}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    StyleSheetname: {
        backgroundColor: "rgba(4, 84, 124, 1)",
    },
    container: {
        flex: 1,
        /*backgroundColor: '#04547C',*/
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    titulo: {
        fontSize: 30,
        color: '#000000',
        fontWeight: 'bold',
        
    },
    subTitle: {
        fontSize: 20,
        color: 'gray',
    },
    subTitle1:{
        fontSize: 16,
        color: 'black',
    },
    c2:{
        flexDirection: 'row',
        /*alignItems: 'flex-start'*/
        display: 'flex', 
        padding: '0.25px',
  
    }
});
