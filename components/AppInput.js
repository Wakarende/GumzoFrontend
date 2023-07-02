import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../config/colors';

function AppInput({name, control, rules, icon, ...otherProps}) {
  return (
    <View style={styles.container}>
      {icon && <MaterialCommunityIcons name={icon} size={20} color="black" />}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            {...otherProps}
          />
        )}
        name={name}
        rules={rules}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
    width: '100%',
    flex: 1,
  },
});

export default AppInput;
