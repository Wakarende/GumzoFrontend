import React from 'react';
import {View, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

//Local imports
import AppInput from '../../components/AppInput';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import PrimaryButton from '../../components/PrimaryButton';

//Validation Schema for login form, validates email and password
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .required()
    .label('First Name'),
  lastName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .required()
    .label('Last Name'),
  dob: Yup.date().required().label('dob'),
});

//Using the useForm hook for form opeations and validation
function UserInfoScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/Profile.png')}
          style={styles.profilePicture}
        />
      </View>
      <View style={styles.form}>
        {/* First Name */}
        <AppInput
          control={control}
          name="firstName"
          rules={{required: true}}
          placeholder="First Name"
          style={styles.input}
        />
        {errors.firstName && <AppText>{errors.firstName.message}</AppText>}
        {/* Last Name */}
        <AppInput
          control={control}
          name="lastName"
          rules={{required: true}}
          placeholder="Last Name"
          style={styles.input}
        />
        {errors.lastName && <AppText>{errors.lastName.message}</AppText>}
        {/* Date of Birth */}
        <AppInput
          control={control}
          name="dob"
          rules={{required: true}}
          placeholder="Date Of Birth"
          style={styles.input}
        />
        {errors.lastName && <AppText>{errors.lastName.message}</AppText>}
      </View>
      <View style={styles.button}>
        <PrimaryButton
          label="Continue"
          onPress={() => navigation.navigate('UserInterests')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  profilePicture: {
    width: 200,
    height: 200,
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkGray,
    paddingLeft: 48,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    borderColor: colors.lightGray,
    borderWidth: 1,
    width: '80%',
  },
  form: {
    flex: 1,
    // justifyContent: 'center',
  },
  button: {
    width: '80%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
export default UserInfoScreen;
