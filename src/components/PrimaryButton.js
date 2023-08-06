import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
// import {useTheme} from '@react-navigation/native';
import colors from '../config/colors';

const PrimaryButton = ({onPress, label, style, labelStyle}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.grannySmithApple,
    paddingHorizontal: 32,
    height: 52,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {fontSize: 16, fontWeight: '600', color: colors.white},
});
export default PrimaryButton;
