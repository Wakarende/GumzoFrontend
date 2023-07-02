import React from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";

//Local imports
import { AppForm, AppFormField } from "../components/forms";
import Screen from "../components/Screen";
import SubmitButton from "../components/forms/SubmitButton";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(3).label("username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
function RegisterScreen(props) {
  return (
    <Screen style={styles.container}>
      <Image source={require("../assets/logo.jpeg")} style={styles.logo} />
      <AppText style={styles.title}>Register</AppText>
      <AppForm
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          keyboardType="default"
          name="username"
          placeholder="Username"
          textContentType="username"
        />
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
        <SubmitButton title="Register" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontWeight: 100,
    alignSelf: "center",
    fontSize: 40,
    marginBottom: 10,
  },
});
export default RegisterScreen;
