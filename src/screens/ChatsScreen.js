import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';

//local imports
import colors from '../config/colors';
import Screen from '../components/Screen';

import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import {GestureHandlerRefContext} from '@react-navigation/stack';

const chats = [
  {
    title: 'My John Doe',
    image: require('../../assets/Profile.png'),
  },
  {
    title: 'My John Doe',
    image: require('../../assets/Profile.png'),
  },
];

function ChatsScreen(props) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Screen style={styles.screen}>
        <View style={styles.container}>
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

const styles = StyleSheet.create({
  screen: {},
});

export default ChatsScreen;
