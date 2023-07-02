//Third party imports
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

//Local imports
import colors from '../config/colors';
function AppButton({title, onPress, color = 'pastelGreen'}) {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors[color]}]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.pastelGreen,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    // marginHorizontal: "10%",
    marginTop: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});

export default AppButton;
