import React from 'react';
import {TextInput} from 'react-native';
import { darkGreen } from './Constants';

const Field3 = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 20, color: darkGreen, paddingHorizontal: 10, paddingTop:10, width: '78%', height:'30%', backgroundColor: 'rgb(220,220, 220)',marginVertical: 10, marginLeft:40}}
      ></TextInput>
  );
};

export default Field3;