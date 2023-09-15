import React, {useEffect, useContext} from 'react';
import AppText from '../../components/text/AppText';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {interests} from '../../utils/interests';
import colors from '../../config/colors';
import PrimaryButton from '../../components/button/PrimaryButton';
import {FormContext} from '../../components/FormContext';
import InterestCard from '../../components/cards/InterestCard';

function UserInterestsScreen({navigation, route}) {
  //user id
  const {uid} = route.params;
  const {state, dispatch} = useContext(FormContext);
  const selectedInterests = state.selectedInterests;
  useEffect(() => {
    console.log('Current selected interests:', selectedInterests);
  }, [selectedInterests]);

  //Validation schema
  const interestSchema = Yup.object().shape({
    selectedInterests: Yup.array()
      .min(1, 'At least one interest must be selected')
      .required(),
  });
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
    // Dispatch the updated interests to the context
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'selectedInterests', value: newSelectedInterests},
    });
    console.log(`Selected: ${interestItem}`);
  };
  //Handle continue
  const handleContinue = () => {
    interestSchema
      .validate({selectedInterests})
      .then(() => {
        navigation.navigate('LanguageProficiency', {uid});
      })
      .catch(error => {
        alert(error.message); // Notify user about the validation error
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>Your Interests</AppText>
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
        <PrimaryButton label="Continue" onPress={handleContinue} />
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
  buttonContainer: {marginTop: 40},
  cardSelected: {
    backgroundColor: colors.pastelGreen,
  },
});
export default UserInterestsScreen;
