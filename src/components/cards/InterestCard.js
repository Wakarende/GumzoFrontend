import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Local imports
import AppText from '../text/AppText';
import colors from '../../config/colors';

const InterestCard = ({interest, iconName, onPress, isSelected}) => (
  <TouchableOpacity
    style={[styles.card, isSelected ? styles.cardSelected : null]}
    onPress={onPress}
    testID="interest-card">
    <View style={styles.cardInfo}>
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={isSelected ? 'white' : colors.grannySmithApple}
        testID="interest-icon"
      />
      <AppText>{interest}</AppText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 9,
  },
  card: {
    width: 127,
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 30,
    paddingLeft: 20,
    borderColor: colors.grannySmithApple,
    borderRadius: 15,
    // marginBottom: 10,
    marginTop: 15,
  },
  cardSelected: {
    backgroundColor: colors.pastelGreen,
  },
});
export default InterestCard;
