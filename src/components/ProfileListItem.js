import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';

//local imports
import AppText from './AppText';
import colors from '../config/colors';
import Screen from './Screen';
function ProfileListItem({title, subTitle, image, ImageComponent, onPress}) {
  return (
    <Screen>
      <TouchableHighlight underlayColor={colors.lightGrey} onPress={onPress}>
        <View style={styles.container}>
          <AppText style={styles.profileTitle}>Profile</AppText>
          {ImageComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
            {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
          </View>
        </View>
      </TouchableHighlight>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    letterSpacing: 1.5,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: 500,
  },
});
export default ProfileListItem;
