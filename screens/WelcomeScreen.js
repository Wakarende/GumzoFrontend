import React from 'react';
import {StyleSheet, Image} from 'react-native';

//Local imports
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

function WelcomeScreen({navigation}) {
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/Logo.png')} />
      <AppButton
        title="Get Started"
        onPress={() => navigation.navigate('Login')}
      />
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
    width: 450,
    height: 450,
  },
});

export default WelcomeScreen;
