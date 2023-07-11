import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import colors from './config/colors';
import AppButton from './components/AppButton';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Local imports
import Screen from './components/Screen';
import AppText from './components/AppText';
import AppTextInput from './components/AppTextInput';
import firebaseApp from './firebaseConfig';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ListItem from './components/ListItem';
import ProfileListItem from './components/ProfileListItem';
import AccountScreen from './screens/AccountScreen';
import {NavigationContainer} from '@react-navigation/native';
import DashboardScreen from './screens/DashboardScreen';
//Function that will return a Promise for loading the fonts
const fetchFonts = () => {
  // Call Font.loadAsync and pass it an object.
  // Each key-value pair in the object represents a font that we want to load.
  // The key is the name that we'll use to refer to the font in our app.
  // The value is the location of the font file in our project.
  return Font.loadAsync({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });
};

const Stack = createNativeStackNavigator();

export default function App() {
  // Create a state variable to track whether the fonts are loaded
  const [fontLoaded, setFontLoaded] = useState(false);

  // If the fonts are not loaded, show the AppLoading component
  // This component will show a loading screen until the Promise from fetchFonts is resolved
  // When the Promise is resolved (i.e., the fonts are loaded), we update fontLoaded to true
  // If there is an error loading the fonts, we log the error to the console
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Prevent splash screen from hiding before fonts are loaded
        await SplashScreen.preventAutoHideAsync();
        // Load fonts
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // When fonts are loaded, manually hide the splash screen
        setFontLoaded(true);
        SplashScreen.hideAsync();
      }
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // This line hides the header
        }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{title: 'Dashboard'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
