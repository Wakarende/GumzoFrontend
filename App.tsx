/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, View, Text, Image} from 'react-native';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// local imports
import RootNavigator from './navigators/RootNavigator';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import colors from './src/config/colors';
import CreateProfileScreen from './src/screens/profilesetup/CreateProfileScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ProfileSetupNavigators from './navigators/ProfileSetupNavigators';
import DatePicker from 'react-native-date-picker';
import {Picker} from 'react-native-wheel-pick';
// import { FormProvider } from 'react-hook-form';
import {FormProvider} from './src/components/FormContext';
import UserBioScreen from './src/screens/profilesetup/UserBioScreen';

//Remove default theme colour of react native navigation
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

function App(): JSX.Element {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const [date, setDate] = useState(new Date('09-10-2021'));
  const [open, setOpen] = useState(false);
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer theme={MyTheme}>
        <FormProvider>
          <RootNavigator />
        </FormProvider>
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
