import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import {useTheme} from '@react-navigation/native';

function BackArrow({onPress}) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.iconBorder}
      testID="back-arrow-button">
      <MaterialCommunityIcons
        name="arrow-left"
        size={24}
        color={theme.colors.text}
        style={styles.icon}
        testID="back-arrow-icon"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
  iconBorder: {
    borderWidth: 1,
    borderColor: colors.grannySmithApple,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 5,
  },
});

export default BackArrow;
