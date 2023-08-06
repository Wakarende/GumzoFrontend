import React, {useState, useEffect} from 'react';
import AppText from '../../components/AppText';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {interests} from '../../utils/interests';
import colors from '../../config/colors';
import PrimaryButton from '../../components/PrimaryButton';

const InterestCard = ({interest, iconName, onPress, isSelected}) => (
  <TouchableOpacity
    style={[styles.card, isSelected ? styles.cardSelected : null]}
    onPress={onPress}>
    <View style={styles.cardInfo}>
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={isSelected ? 'white' : colors.grannySmithApple}
      />
      <AppText>{interest}</AppText>
    </View>
  </TouchableOpacity>
);
function UserInterestsScreen({navigation}) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  useEffect(() => {
    console.log('Current selected interests:', selectedInterests);
  }, [selectedInterests]);
  //Handle array of interests
  const handleInterestSelect = interestItem => {
    //Check if interest is already selected
    let isInterestSelected = false;
    for (let interest of selectedInterests) {
      if (interest.interest === interestItem.interest) {
        isInterestSelected = true;
        break;
      }
    }

    //create a new array to store the updated selected interests
    let newSelectedInterests = [];

    if (isInterestSelected) {
      //If the interest is selected, remove it
      for (let interest of selectedInterests) {
        if (interest.interest !== interestItem.interest) {
          newSelectedInterests.push(interest);
        }
      }
    } else {
      //if interest is not selected, add it
      newSelectedInterests = [...selectedInterests, interestItem];
    }
    //update the state of the new array
    setSelectedInterests(newSelectedInterests);

    console.log(`Selected: ${interestItem}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>You Interests</AppText>
      <AppText style={styles.text}>
        Select a few of your interests and let everyone know what you’re
        passionate about.
      </AppText>
      <View style={styles.cardContainer}>
        {interests.map((item, index) => (
          <InterestCard
            key={index}
            interest={item.interest}
            iconName={item.iconName}
            isSelected={selectedInterests.some(
              int => int.interest == item.interest,
            )}
            onPress={() => handleInterestSelect(item)}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton label="Continue" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
  },
  text: {},
  card: {
    width: 147,
    height: 50,
    margin: '1%',
    alignItems: 'center',
    borderWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 30,
    paddingLeft: 20,
    borderColor: colors.grannySmithApple,
    borderRadius: 15,
    marginBottom: 11,
    marginTop: 32,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 9,
  },
  buttonContainer: {marginTop: 87},
  cardSelected: {
    backgroundColor: colors.pastelGreen,
  },
});
export default UserInterestsScreen;
