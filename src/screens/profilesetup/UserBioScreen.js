import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getFirestore, doc, setDoc} from 'firebase/firestore';

//local imports
import AppText from '../../components/AppText';
import {TextInput} from 'react-native-gesture-handler';
import PrimaryButton from '../../components/button/PrimaryButton';
import {FormContext} from '../../components/FormContext';
import firebaseApp from '../../../firebaseConfig';

function UserBioScreen({navigation, route}) {
  const {state, dispatch} = useContext(FormContext);
  //user id
  const {uid} = route.params;
  console.log('UID:', uid);
  const handleBioChange = text => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'bio', value: text},
    });
  };

  //handle form submission to firebase
  const handleSubmit = async () => {
    console.log('handleSubmit called');
    try {
      const db = getFirestore(firebaseApp);
      //update the user document with uid
      const userRef = doc(db, 'users', uid);
      const userProfile = {
        firstName: state.firstName,
        lastName: state.lastName,
        dob: state.dob ? state.dob : null,
        nativeLanguage: state.nativeLanguage,
        selectedImage: state.selectedImage,
        selectedInterests: state.selectedInterests,
        selectedProficiency: state.selectedProficiency,
        learningGoals: state.learningGoals,
        bio: state.bio,
      };

      console.log('User Profile:', userProfile);
      console.log('DOB' + state.dob);
      await setDoc(userRef, userProfile, {merge: true});

      console.log('Form Submitted:', userProfile);

      navigation.navigate('DashboardScreen');
    } catch (error) {
      console.error('Error updating user bio: ', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>Bio</AppText>
      <AppText style={styles.text}>
        Tell us a bit more about yourself. What is your background? What are
        your language learning goals? What do you like to talk about?
      </AppText>
      <View>
        <TextInput
          placeholder="Bio"
          style={styles.input}
          onChangeText={handleBioChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton label="Submit" onPress={handleSubmit} />
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
export default UserBioScreen;
