import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../config/colors';
import AppText from '../AppText';
import Icon from '../icon/Icon';

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  endIcons = [],
  showArrow = true,
}) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={{uri: image}} />}
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={4}>
              {subTitle}
            </AppText>
          )}
        </View>
        {endIcons.length ? (
          endIcons.map((icon, index) => (
            <TouchableOpacity key={index} onPress={icon.onPress}>
              <MaterialCommunityIcons
                key={index}
                color={icon.color || colors.medium}
                name={icon.name}
                size={icon.size || 25}
                style={{marginLeft: index > 0 ? 5 : 0}} // Add space between icons
              />
            </TouchableOpacity>
          ))
        ) : showArrow ? (
          <MaterialCommunityIcons
            color={colors.grannySmithApple}
            name="chevron-right"
            size={25}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: '500',
  },
});

export default ListItem;
