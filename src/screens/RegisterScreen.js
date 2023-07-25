import React from 'react';
import {StyleSheet, Image} from 'react-native';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
//Local imports
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

//Define validation rules using Yup
const validationSchema = Yup.object().shape({
  // username: Yup.string().required(),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});
function RegisterScreen(props) {
  //Initialize useForm with yupResolver and validation schema
  const {
    control, //control object to control form events
    handleSubmit, //function to handle form submit event
    formState: {errors}, //errors object to handle form validation errors
  } = useForm({
    resolver: yupResolver(validationSchema), //tell react-hook-form to use yupResolver with the validation schema
  });

  //function to handle form submit
  const onSubmit = async data => {
    console.log('onSubmit triggered');
    console.log(data);

    //Firebase Authentication
    try {
      const response = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      console.log('User account created & signed in!', response);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  };
  return (
    <Screen style={styles.container}>
      <AppText style={styles.title}>Register</AppText>
      {/* Create a controlled input for 'email', with validation rules and icon */}
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
      {/* Display error message if validation failed for 'email' */}
      {errors.email && <AppText>{errors.email.message}</AppText>}

      {/* Create a controlled input for 'password', with validation rules and icon */}
      <AppInput
        name="password"
        control={control}
        icon="lock"
        rules={{required: true}}
        placeholder="Password"
        secureTextEntry
        textContentType="password"
      />
      {/* Display error message if validation failed for 'password' */}
      {errors.password && <AppText>{errors.password.message}</AppText>}
      {/* Create a controlled input for 'passwordConfirmation', with validation rules and icon */}
      <AppInput
        name="passwordConfirmation"
        control={control}
        icon="lock"
        rules={{required: true}}
        placeholder="Confirm Password"
        secureTextEntry
        textContentType="password"
      />
      {/* Display error message if password does not match initial password */}
      {errors.passwordConfirmation && (
        <AppText>{errors.passwordConfirmation.message}</AppText>
      )}
      {/* Create submit button */}
      <AppButton title="Register" onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
    // marginBottom: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: 100,
    alignSelf: 'center',
    fontSize: 40,
    // marginBottom: 10,
  },
});
export default RegisterScreen;
