import React from 'react';
import {StyleSheet, View} from 'react-native';

import colors from '../../config/colors';

function ListItemSeparator() {
  return <View style={styles.separator} testID="list-item-separator" />;
}

const styles = StyleSheet.create({
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: colors.lightGray,
    alignSelf: 'center',
  },
});

export default ListItemSeparator;
