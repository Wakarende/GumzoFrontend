import React from 'react';
import {Text} from 'react-native';

import defaultStyles from '../config/styles';
function AppText({
  children,
  style,
  onPress,
  numberOfLines,
  adjustsFontSizeToFit,
}) {
  return (
    <Text
      style={[defaultStyles.text, style]}
      onPress={onPress}
      numberOfLines={2}
      adjustsFontSizeToFit={true}>
      {children}
    </Text>
  );
}

export default AppText;
