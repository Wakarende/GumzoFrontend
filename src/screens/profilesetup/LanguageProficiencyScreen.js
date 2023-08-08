import React, {useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

//Local Imports
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import PrimaryButton from '../../components/PrimaryButton';
import {proficiencyLevels} from '../../utils/proficiency';
import {FormContext} from '../../components/FormContext';
import FluencyCard from '../../components/FluencyCard';
//Reusable Fluency Card component for displaying proficiency level options
// const FluencyCard = ({title, onPress, isSelected}) => (
//   <TouchableOpacity
//     style={[styles.card, isSelected ? styles.cardSelected : null]}
//     onPress={onPress}>
//     <View style={styles.cardInfo}>
//       <AppText color={isSelected ? 'white' : colors.darkGray}>{title}</AppText>
//     </View>
//   </TouchableOpacity>
// );

console.log(proficiencyLevels);
function LanguageProficiencyScreen({navigation, route}) {
  const {uid} = route.params;
  console.log('Route Params:', route.params);

  // const [selectedProficiency, setSelectedProficiency] = useState([]);
  const {state, dispatch} = useContext(FormContext);
  const selectedProficiency = state.selectedProficiency;
  useEffect(() => {
    console.log('Current selected proficiency:', selectedProficiency);
  }, [selectedProficiency]);
  //Handle array of proficiency
  const handleProficiencySelect = proficiencyItem => {
    //Check if proficiency is already selected
    let isProficiencySelected = false;
    for (let proficiency of selectedProficiency) {
      if (proficiency.proficiency === proficiencyItem.proficiency) {
        isProficiencySelected = true;
        break;
      }
    }

    //create a new array to store the updated selected proficiency
    let newSelectedProficiency = [];

    if (isProficiencySelected) {
      //If the proficiency is selected, remove it
      for (let proficiency of selectedProficiency) {
        if (proficiency.proficiency !== proficiencyItem.proficiency) {
          newSelectedProficiency.push(proficiency);
        }
      }
    } else {
      //if proficiency is not selected, add it
      newSelectedProficiency = [...selectedProficiency, proficiencyItem];
    }

    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'selectedProficiency', value: newSelectedProficiency},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <AppText style={styles.title}>Language Proficiency</AppText>
        <AppText style={styles.text}>
          What is your current level of swahili proficiency?
        </AppText>
      </View>
      <View style={styles.cardContainer}>
        {proficiencyLevels.map((item, index) => (
          <FluencyCard
            key={index}
            title={item.title}
            isSelected={selectedProficiency.some(
              proficiency => proficiency.proficiency === item.proficiency,
            )}
            onPress={() => handleProficiencySelect(item)}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          label="Continue"
          onPress={() => navigation.navigate('UserBio', {uid})}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  buttonContainer: {marginTop: 40},
  cardSelected: {
    backgroundColor: colors.pastelGreen,
  },
  button: {},
  title: {
    fontSize: 34,
    fontWeight: 700,
  },
  textContainer: {
    justifyContent: 'flex-start',
  },
});
export default LanguageProficiencyScreen;
