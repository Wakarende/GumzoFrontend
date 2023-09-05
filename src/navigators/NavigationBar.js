import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import NotificationBadge from '../components/NotificationBadge';
import {onAuthStateChanged} from '@firebase/auth';
import {getAuth} from '@firebase/auth';
//local imports
import AccountScreen from '../screens/account/AccountScreen';
import ChatsScreen from '../screens/chats/ChatsScreen';
import firebaseApp from '../../firebaseConfig';
import MatchScreen from '../screens/match/MatchScreen';
// import colors from '../src/config/colors';
import {StyleSheet} from 'react-native';
import useMatchesCount from '../utils/MatchesCount';
const Tab = createBottomTabNavigator();

function AccountTabBarIcon({color, size}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  const matchesCount = useMatchesCount(user);

  return (
    <View>
      <MaterialCommunityIcons name="account" color={color} size={size} />
      {matchesCount > 0 && (
        <View style={{position: 'absolute', right: 0, top: 0}}>
          <NotificationBadge count={matchesCount} />
        </View>
      )}
    </View>
  );
}

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

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
  },
});
export default NavigationBar;
