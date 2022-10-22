import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {Container}  from './styles/FeedStyles';

const MessagesScreen=()=> {
  return (
    <Container>
      <Text style={styles.text}>Aquí va la pantalla de mensajes</Text>
    </Container>
  );
}
export default MessagesScreen

const styles = StyleSheet.create({
  container:{

    backgroundColor:'fff',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,

  },
  text:{
    fontSize:20,
    color:'#333333'
  }

})