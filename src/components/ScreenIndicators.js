import {View, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../config/colors';

const ScreenIndicators = ({count, activeIndex}) => {
  return (
    <View style={styles.container}>
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
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 32,
  },
});
export default ScreenIndicators;
