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
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Mosh Hamedani"
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
