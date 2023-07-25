import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

// local imports
import RootNavigator from './src/navigators/navigators/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
function App(props) {
  return (
    <SafeAreaView>
      <NavigationContainer style={{flex: 1}}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
