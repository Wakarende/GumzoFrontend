import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

//local imports
import AccountScreen from '../screens/AccountScreen';
import ChatsScreen from '../screens/ChatsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MatchScreen from '../screens/MatchScreen';
import colors from '../config/colors';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

function NavigationBar(props) {
  return (
    <Tab.Navigator style={styles.shadow}>
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Match"
        component={MatchScreen}
        options={({navigation}) => ({
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
  },
});
export default NavigationBar;
