//Third party imports
import React from "react";
import { StyleSheet, Image } from "react-native";

import * as Yup from "yup";
//Local imports
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import ErrorMessage from "../components/forms/ErrorMessage";
import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";

//Validation Schema for Form
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
function LoginScreen(props) {
  return (
    <Screen style={styles.container}>
      <Image source={require("../assets/logo.jpeg")} style={styles.logo} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="login" />
      </AppForm>
      <AppText style={styles.register}>
        Don't have an account? Register here.
      </AppText>
    </Screen>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  container: {
    marginHorizontal: "10%",
  },
  logo: {
    width: 350,
    height: 350,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  register: {
    marginTop: 20,
    fontSize: 16,
  },
});
export default LoginScreen;
