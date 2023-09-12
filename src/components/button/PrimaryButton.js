import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../config/colors';

const PrimaryButton = ({onPress, label, style, labelStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      testID="primary-button">
      <Text style={[styles.text, labelStyle]} testID="primary-button-label">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.grannySmithApple,
    paddingHorizontal: 32,
    height: 52,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {fontSize: 16, fontWeight: '600', color: colors.white},
});

export default PrimaryButton;
