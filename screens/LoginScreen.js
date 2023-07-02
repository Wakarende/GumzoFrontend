import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

//Local Imports
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from '../components/Screen';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.login}>Login</AppText>
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      <AppInput
        name="email"
        control={control}
        icon="email"
        rules={{required: true}}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      {errors.email && <AppText>{errors.email.message}</AppText>}

      <AppInput
        name="password"
        control={control}
        rules={{required: true}}
        placeholder="Password"
        icon="lock"
        secureTextEntry
        textContentType="password"
      />
      {errors.password && <AppText>{errors.password.message}</AppText>}

      <AppButton title="Login" onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  login: {
    marginBottom: 10,
    fontSize: 40,
    color: colors.mediumGray,
  },
  logo: {
    width: 250,
    height: 250,
  },
});

export default LoginScreen;
