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

//Tab icon component
function TabIcon({focused, iconName}) {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
      <MaterialCommunityIcons name={iconName} color="green" size={25} />
      <Text
        style={{
          color: focused ? colors.pastelGreen : colors.lightGray,
        }}>
        {iconName}
      </Text>
    </View>
  );
}

function NavigationBar(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [
          {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#ffff',
            borderRadius: 15,
            height: 90,
            ...styles.shadow,
          },
        ],
      }}
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: props => <TabIcon {...props} iconName="home-outline" />,
        }}
      />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
  },
  icon: {
    size: 30,
  },
});
export default NavigationBar;
