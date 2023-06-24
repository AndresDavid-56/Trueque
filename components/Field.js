import React from 'react';
import {TextInput} from 'react-native';
import { darkGreen } from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '78%', height:'8%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
      ></TextInput>
  );
};

export default Field;
