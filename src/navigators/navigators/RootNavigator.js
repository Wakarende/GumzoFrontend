import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '../../screens/IntroScreen';
import IntroScreen01 from '../../screens/IntroScreen01';
import IntroScreen02 from '../../screens/IntroScreen02';
import LogInScreen from '../../screens/LogInScreen';
import DashboardScreen from '../../screens/IntroScreen';
import NavigationBar from './NavigationBar';
import TabNavigators from './TabNavigators';
import RegisterScreen from '../../screens/RegisterScreen';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        <RootStack.Screen name="IntroScreen" component={IntroScreen} />
        <RootStack.Screen name="IntroScreen01" component={IntroScreen01} />
        <RootStack.Screen name="IntroScreen02" component={IntroScreen02} />
        <RootStack.Screen name="LogInScreen" component={LogInScreen} />
        <RootStack.Screen name="DashboardScreen" component={NavigationBar} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
