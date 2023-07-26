import {View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import colors from '../config/colors';

const ScreenIndicators = ({count, activeIndex}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginVertical: 32,
      }}>
      {new Array(count).fill('1').map((_, i) => (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 8,
            backgroundColor:
              i === activeIndex ? colors.grannySmithApple : colors.lightGray,
          }}
          key={i}
        />
      ))}
    </View>
  );
};

export default ScreenIndicators;
