import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//local imports
import AppText from '../text/AppText';
import colors from '../../config/colors';

function FluencyCard({title, onPress, isSelected}) {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected ? styles.cardSelected : null]}
      onPress={onPress}>
      <View style={styles.cardInfo}>
        <AppText color={isSelected ? styles.cardSelected : null}>
          {title}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 340,
    height: 66,
    alignItems: 'center',
    borderWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 30,
    paddingLeft: 20,
    borderColor: colors.grannySmithApple,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 32,
  },
  cardSelected: {
    backgroundColor: colors.pastelGreen,
    color: colors.white,
  },
});
export default FluencyCard;
