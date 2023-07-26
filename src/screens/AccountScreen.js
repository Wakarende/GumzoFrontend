import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';

//local imports
import colors from '../config/colors';
import Icon from '../components/Icon';
import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import ProfileListItem from '../components/ProfileListItem';
import Screen from '../components/Screen';

//Data displayed on flatlist
const menuItems = [
  {
    title: 'Account Settings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.grannySmithApple,
    },
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: colors.grannySmithApple,
    },
    // targetScreen: routes.MESSAGES,
  },
  {
    title: 'Log Out',
    icon: {
      name: 'logout',
      backgroundColor: colors.grannySmithApple,
    },
  },
];

function AccountScreen({navigation}) {
  // //initializing the state variable for the user
  // const [user, setUser] = useState();

  // // Using the useEffect hook to set the state variable when the component mounts
  // useEffect(() => {
  //   // Firebase function to get the currently authenticated user
  //   setUser(auth().currentUser);
  // }, []); // Empty dependency array means this effect will only run once, when the component mounts
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={'Joy Kirii'}
          // title={user ? user.displayName : ''}
          image={require('../../assets/Profile.png')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              //onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    marginVertical: 10,
  },
});

export default AccountScreen;
