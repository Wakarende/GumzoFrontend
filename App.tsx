/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

// local imports
import RootNavigator from './navigators/RootNavigator';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import colors from './src/config/colors';
import CreateProfileScreen from './src/screens/profilesetup/CreateProfileScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ProfileSetupNavigators from './navigators/ProfileSetupNavigators';
//Remove default theme colour of react native navigation
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer theme={MyTheme}>
        <ProfileSetupNavigators />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
