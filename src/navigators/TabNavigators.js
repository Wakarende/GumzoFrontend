import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//local imports
import NavigationBar from './NavigationBar';

/**
 * Represents the main tab navigator for the application.
 *
 * @param {Object} props - Properties passed to the TabNavigators component.
 * @return {React.Component} - Returns the Tab Navigator component.
 */
function TabNavigators(props) {
  //Create an instance of the bottom tab navigator
  const Tab = createBottomTabNavigator();

  <Tab.Navigator>
    <Tab.Screen name="TabBar" component={NavigationBar} />
  </Tab.Navigator>;
}
export default TabNavigators;
