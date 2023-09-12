import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import NotificationBadge from '../components/badge/NotificationBadge';
import {onAuthStateChanged} from '@firebase/auth';
import {getAuth} from '@firebase/auth';
import {getFirestore} from '@firebase/firestore';
//local imports
import AccountScreen from '../screens/account/AccountScreen';
import ChatsScreen from '../screens/chats/ChatsScreen';
import firebaseApp from '../../firebaseConfig';
import MatchScreen from '../screens/match/MatchScreen';
// import colors from '../src/config/colors';
import {StyleSheet} from 'react-native';
// import useMatchesCount from '../utils/MatchesCount';
import {initializeNotificationListener} from '../utils/notificationsLogic';

// Initialize the bottom tab navigator
const Tab = createBottomTabNavigator();

/**
 * Renders an icon for the Account tab with a notification badge.
 *
 * @param {string} color - Color of the icon.
 * @param {number} size - Size of the icon.
 * @return {React.Component} - The rendered component.
 */
function AccountTabBarIcon({color, size}) {
  const [user, setUser] = useState(null);
  //State to store notification count
  const [notifications, setNotifications] = useState(0);

  // Subscribe to auth state changes to get the current user
  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Subscribe to notification updates once the user is set
  useEffect(() => {
    let unsubscribeFromUpdates;
    if (user) {
      unsubscribeFromUpdates = initializeNotificationListener(
        getFirestore(firebaseApp),
        user,
        setNotifications,
      );
    }
    //Cleanup subscription on component unmount
    return () => {
      if (unsubscribeFromUpdates) {
        unsubscribeFromUpdates();
      }
    };
  }, [user]);

  return (
    <View>
      <MaterialCommunityIcons name="account" color={color} size={size} />
      {notifications > 0 && (
        <View style={{position: 'absolute', right: 0, top: 0}}>
          <NotificationBadge count={notifications} />
        </View>
      )}
    </View>
  );
}

/**
 * Renders the navigation bar with tabs for Match, Chats, and Account.
 *
 * @param {Object} props - Props passed to the component.
 * @return {React.Component} - The rendered component.
 */
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
          tabBarIcon: props => <AccountTabBarIcon {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
  },
});
export default NavigationBar;
