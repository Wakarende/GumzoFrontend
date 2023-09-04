import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import NotificationBadge from '../components/NotificationBadge';
//local imports
import AccountScreen from '../screens/account/AccountScreen';
import ChatsScreen from '../screens/chats/ChatsScreen';
import MatchScreen from '../screens/match/MatchScreen';
// import colors from '../src/config/colors';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

function NavigationBar(props) {
  return (
    <Tab.Navigator style={styles.shadow}>
      <Tab.Screen
        name="Match"
        component={MatchScreen}
        options={{
          tabBarActiveTintColor: '#ACE7A3',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarActiveTintColor: '#ACE7A3',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarActiveTintColor: '#ACE7A3',
          tabBarIcon: ({color, size}) => (
            <View>
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
              <View style={{position: 'absolute', right: 0, top: 0}}>
                <NotificationBadge count={3} />
              </View>
            </View>
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
