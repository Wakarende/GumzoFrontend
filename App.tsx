/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import RootNavigator from './src/navigators/RootNavigator';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import colors from './src/config/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FormProvider} from './src/components/FormContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SectionProps = PropsWithChildren<{
  title: string;
}>;
import * as ImagePicker from 'expo-image-picker';
//Remove default theme colour of react native navigation

//local imports
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import firebaseApp from './firebaseConfig';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};
function App(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  //Setup auth listener
  useEffect(() => {
    const auth = getAuth(firebaseApp);

    // This listener is triggered on sign-in/sign-out
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in.
        // Here you can set the user information to a global state (like Redux or Context API)
        // or local state.
        console.log('User signed in: ', user.email);
      } else {
        // User is signed out.
        console.log('User signed out');
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

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
