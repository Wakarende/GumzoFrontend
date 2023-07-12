import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

//local imports
import colors from '../config/colors';
import Icon from '../components/Icon';
import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import ProfileListItem from '../components/ProfileListItem';
import Screen from '../components/Screen';

const menuItems = [
  {
    title: 'Account Settings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.pastelGreen,
    },
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: colors.pastelGreen,
    },
    // targetScreen: routes.MESSAGES,
  },
  {
    title: 'Log Out',
    icon: {
      name: 'logout',
      backgroundColor: colors.pastelGreen,
    },
  },
];

function AccountScreen({navigation}) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ProfileListItem
          title="JKjk"
          image={require('../assets/Profile.png')}
          style={styles.profile}
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
    backgroundColor: colors.light,
    flex: 1,
  },
  container: {
    marginVertical: 20,
    flex: 1,
  },
});

export default AccountScreen;
