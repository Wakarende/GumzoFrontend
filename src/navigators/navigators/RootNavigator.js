import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '../../screens/IntroScreen';
import IntroScreen01 from '../../screens/IntroScreen01';
import IntroScreen02 from '../../screens/IntroScreen02';
import LogInScreen from '../../screens/LogInScreen';
import DashboardScreen from '../../screens/IntroScreen';
import NavigationBar from './NavigationBar';
// import TabNavigators from './TabNavigators';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//local imports
import AccountScreen from '../../screens/AccountScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import CreateProfileScreen from '../../screens/profilesetup/CreateProfileScreen';
import SingleChatScreen from '../../screens/SingleChatScreen';
import ChatsScreen from '../../screens/ChatsScreen';
import MatchScreen from '../../screens/MatchScreen';
import UserInfoScreen from '../../screens/profilesetup/UserInfoScreen';

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
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
