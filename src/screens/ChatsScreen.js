import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  FlatList,
  GestureHandlerRootView,
  TextInput,
} from 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//local imports
import colors from '../config/colors';
import Screen from '../components/Screen';

import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';

const chats = [
  {
    title: 'My John Doe',
    image: require('../../assets/Profile.png'),
  },
  {
    title: 'My John Do',
    image: require('../../assets/Profile.png'),
  },
];

function ChatsScreen({navigation}) {
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <TextInput style={styles.searchBar} />
            <TouchableOpacity onPress={() => console.log('search!')}>
              <MaterialCommunityIcons
                name="magnify"
                color={colors.grannySmithApple}
                size={30}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={chats}
            keyExtractor={chat => chat.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({item}) => (
              <ListItem
                title={item.title}
                image={item.image}
                onPress={() => {
                  navigation.navigate('SingleChat');
                }}
              />
            )}
          />
        </View>
      </Screen>
    </GestureHandlerRootView>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGray,
    overflow: 'visible',
  },
  searchBar: {
    paddingLeft: 20,
    paddingRight: 60,
    width: '90%',
  },
  iconContainer: {
    position: 'absolute',
    right: 5,
    flex: 1,
    justifyContent: 'center',
  },
});
export default ChatsScreen;
