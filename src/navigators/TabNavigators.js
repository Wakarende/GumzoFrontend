import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//local imports
import NavigationBar from './NavigationBar';

function TabNavigators(props) {
  const Tab = createBottomTabNavigator();

  <Tab.Navigator>
    <Tab.Screen name="TabBar" component={NavigationBar} />
  </Tab.Navigator>;
}
export default TabNavigators;
