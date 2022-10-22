import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {Container}  from './styles/FeedStyles';

const InventoryScreen=()=> {
  return (
    <Container>
      <Text style={styles.text}>InventoryScreen</Text>
    </Container>
  );
}
export default InventoryScreen

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