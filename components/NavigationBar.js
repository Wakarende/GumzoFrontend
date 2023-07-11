import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//local imports
import AccountScreen from '../screens/AccountScreen';
import ChatsScreen from '../screens/ChatsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MatchScreen from '../screens/MatchScreen';

const Tab = createBottomTabNavigator();

function NavigationBar(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default NavigationBar;
