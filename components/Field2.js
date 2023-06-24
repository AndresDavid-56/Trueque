import React from 'react';
import {TextInput} from 'react-native';
import { darkGreen } from './Constants';

const Field2 = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 20, color: darkGreen, paddingHorizontal: 10, width: '78%', height:'20%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, marginLeft:40, textAlign:'top'}}
      ></TextInput>
  );
};

export default Field2;