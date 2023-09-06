import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '../screens/onboarding/IntroScreen';
import IntroScreen01 from '../screens/onboarding/IntroScreen01';
import IntroScreen02 from '../screens/onboarding/IntroScreen02';
import LogInScreen from '../screens/onboarding/LogInScreen';
import NavigationBar from './NavigationBar';
import RegisterScreen from '../screens/onboarding/RegisterScreen';
import SingleChatScreen from '../screens/chats/SingleChatScreen';
import ProfileSetupNavigators from './ProfileSetupNavigators';
import UserMessagesScreen from '../screens/account/UserMessagesScreen';
import AccountInfoScreen from '../screens/account/AccountInfoScreen';

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
        <RootStack.Screen name="SingleChat" component={SingleChatScreen} />
        <RootStack.Screen
          name="ProfileSetup"
          component={ProfileSetupNavigators}
        />
        <RootStack.Screen name="UserMessages" component={UserMessagesScreen} />
        <RootStack.Screen name="AccountInfo" component={AccountInfoScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
