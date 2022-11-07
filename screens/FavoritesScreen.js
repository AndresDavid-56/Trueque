import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {Container}  from './styles/FeedStyles';

const FavoritesScreen=()=> {
  return (
    <Container>
      <Text style={styles.text}> Favoritos</Text>
    </Container>
  );
}
export default FavoritesScreen

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