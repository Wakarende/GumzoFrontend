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
    // <Tab.Navigator
    //   screenOptions={{
    //     tabBarStyle: [
    //       {
    //         position: 'absolute',
    //         elevation: 0,
    //         backgroundColor: '#ffff',
    //         ...styles.shadow,
    //         width: '100%',
    //         height: 70,
    //       },
    //     ],
    //     showLabel: false,
    //   }}>
    //   <Tab.Screen
    //     name="Dashboard"
    //     component={DashboardScreen}
    //     options={{
    //       tabBarIcon: ({color, size}) => (
    //         <MaterialCommunityIcons name="home" color="#7cd36c" size={20} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Chats"
    //     component={ChatsScreen}
    //     options={{
    //       tabBarIcon: ({color, size}) => (
    //         <MaterialCommunityIcons name="chat" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Match"
    //     component={MatchScreen}
    //     options={{
    //       tabBarIcon: ({color, size}) => (
    //         <MaterialCommunityIcons name="plus" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Account"
    //     component={AccountScreen}
    //     options={{
    //       tabBarIcon: ({color, size}) => (
    //         <MaterialCommunityIcons name="account" color={color} size={size} />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>

    <Tab.Navigator>
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
  icon: {
    size: 30,
  },
});
export default NavigationBar;
