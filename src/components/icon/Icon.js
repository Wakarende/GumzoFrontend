import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function Icon({
  name,
  size = 40,
  backgroundColor = 'black',
  iconColor = 'white',
}) {
  return (
    <View
      testID="icon-wrapper"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons
        name={name}
        color={iconColor}
        size={size * 0.5}
        testID="material-icon"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {},
});

export default Icon;
