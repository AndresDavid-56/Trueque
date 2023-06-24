import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  placeholderText,
  ...rest
  
  

  
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
        defaultValue={label}
          placeholder={placeholderText}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry={true}
          autoCapitalize='none'
          {...rest}
        />
      ) : (
        <TextInput
        defaultValue={label}
          placeholder={placeholderText}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          autoCapitalize='none'
          autoCorrect={false}
          {...rest}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40AF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
