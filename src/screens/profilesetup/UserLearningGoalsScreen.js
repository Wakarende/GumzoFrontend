import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, View, TextInput} from 'react-native';
import * as yup from 'yup';

//Local imports
import AppText from '../../components/text/AppText';
import PrimaryButton from '../../components/button/PrimaryButton';
import FormContext from '../../components/FormContext';

//Validation Schema
const learningGoalsSchema = yup.object().shape({
  learningGoals: yup
    .string()
    .min(10, 'Cannot continue without learning goals.')
    .required('Learning Goals is required.'),
});
function UserLearningGoalsScreen({navigation, route}) {
  const {state, dispatch} = useContext(FormContext);
  //user id
  const {uid} = route.params;

  //Derive learningGoals from the state
  const {learningGoals} = state;

  const handleLearningChange = text => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'learningGoals', value: text},
    });
  };

  const handleContinue = () => {
    // Validate the learning goals using the schema
    learningGoalsSchema
      .validate({learningGoals: learningGoals})
      .then(() => {
        // If validation is successful, update the state and navigate
        dispatch({
          type: 'UPDATE_FIELD',
          payload: {field: 'learningGoals', value: learningGoals},
        });
        navigation.navigate('UserBio', {uid});
      })
      .catch(err => {
        // Display validation error
        alert(err.errors[0]);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>Learning Goals</AppText>
      <AppText style={styles.text}>
        Tell us a bit more about yourself. What is your background? What are
        your language learning goals? What do you like to talk about?
      </AppText>
      <View>
        <TextInput
          placeholder="Learning Goals"
          style={styles.input}
          onChangeText={handleLearningChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton label="Continue" onPress={handleContinue} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    height: 100,
    marginTop: 40,
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },
});
export default UserLearningGoalsScreen;
