import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from './AppText';

function NotificationBadge({count}) {
  if (!count) return null;
  return (
    <View style={styles.badgeContainer}>
      <AppText style={styles.badgeText}>{count}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
export default NotificationBadge;
