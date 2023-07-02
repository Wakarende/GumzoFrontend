import React from 'react';
import Screen from '../components/Screen';
import {AppForm, AppFormField} from '../components/forms';
import * as Yup from 'yup';

//Validation schema for our form input fields
const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(3).label('username'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});
function ProfileFormScreen(props) {
  return (
    <Screen>
      <AppForm initialValues={{username: ''}}>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          keyboardType="default"
          name="username"
          placeholder="Username"
          textContentType="username"
        />
      </AppForm>
    </Screen>
  );
}

export default ProfileFormScreen;
