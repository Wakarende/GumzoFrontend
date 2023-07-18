import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen01 from '../screens/IntroScreen01';
import IntroScreen02 from '../screens/IntroScreen02';
import LogInScreen from '../screens/LogInScreen';
import DashboardScreen from '../../screens/DashboardScreen';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        <RootStack.Screen name="IntroScreen01" component={IntroScreen01} />
        <RootStack.Screen name="IntroScreen02" component={IntroScreen02} />
        <RootStack.Screen name="LogInScreen" component={LogInScreen} />
        <RootStack.Screen name="DashboardScreen" component={DashboardScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
