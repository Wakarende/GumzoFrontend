import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {Controller} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

function AppInput({name, control, rules, icon, ...otherProps}) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          testID="icon"
          name={icon}
          size={20}
          color={colors.lightGray}
        />
      )}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            testID="text-input"
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
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.input,
    marginBottom: 10,
    color: colors.darkGray,
    height: 70,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
    alignItems: 'center',
  },
});

export default AppInput;
