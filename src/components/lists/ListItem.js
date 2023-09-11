import React, {useState, useEffect} from 'react';
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

const DEFAULT_PROFILE_IMAGE = require('../../../assets/profileImg.jpg');
function ListItem({
  title,
  subTitle,
  IconComponent,
  onPress,
  imageUrl,
  endIcons = [],
  endIcon = null,
  showArrow = true,
  isProfile = false,
}) {
  const [imageSrc, setImageSrc] = useState({uri: imageUrl});
  const handleError = () => {
    setImageSrc(DEFAULT_PROFILE_IMAGE);
  };

  useEffect(() => {
    if (imageUrl) {
      setImageSrc({uri: imageUrl});
    } else {
      setImageSrc(DEFAULT_PROFILE_IMAGE);
    }
  }, [imageUrl]);

  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {imageSrc && isProfile && (
          <Image style={styles.image} source={imageSrc} onError={handleError} />
        )}
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
        ) : endIcon ? ( // Check for the single icon prop
          <TouchableOpacity onPress={endIcon.onPress}>
            <MaterialCommunityIcons
              color={endIcon.color || colors.medium}
              name={endIcon.name}
              size={endIcon.size || 25}
            />
          </TouchableOpacity>
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
