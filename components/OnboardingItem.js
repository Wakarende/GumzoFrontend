import React from 'react';
import {View, useWindowDimensions, StyleSheet, Image} from 'react-native';

//local imports
import AppText from './AppText';
import colors from '../config/colors';
function OnboardingItem({item}) {
  const {width, height} = useWindowDimensions();
  return (
    <View style={[styles.container, {width, height}]}>
      <Image
        source={item.image}
        style={[
          styles.image,
          {width, height: height * 0.7, resizeMode: 'contain'},
        ]}
      />
      <View style={{flex: 0.3}}>
        <AppText style={styles.title}>{item.title}</AppText>
        <AppText style={styles.description}>{item.description}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: colors.darkGray,
    textAlign: 'center',
  },
  description: {
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 10,
    color: colors.lightGray,
    textAlign: 'center',
  },
});
export default OnboardingItem;
