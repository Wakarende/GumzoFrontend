import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FlatList,
  GestureHandlerRootView,
  TextInput,
} from 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GestureHandlerRefContext} from '@react-navigation/stack';

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

function ChatsScreen(props) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
              <ListItem title={item.title} image={item.image} />
            )}
          />
        </View>
      </Screen>
    </GestureHandlerRootView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 10,
//   },
//   searchBarContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     marginBottom: 20,
//     overflow: 'hidden',
//   },
//   searchBar: {
//     borderWidth: 1,
//     borderColor: colors.lightGray,
//     paddingLeft: 20,
//     paddingTop: 20,
//     paddingBottom: 20,
//     paddingRight: 50,
//     marginBottom: 10,
//     borderRadius: 5,
//     width: '90%',
//     // flex: 1,
//   },
//   searchIcon: {
//     position: 'absolute',
//     right: 15,
//     top: 1,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const styles = StyleSheet.create({
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
    // height: 40,
  },
  iconContainer: {
    position: 'absolute',
    right: 5,
    flex: 1,
    justifyContent: 'center',
  },
});
export default ChatsScreen;
