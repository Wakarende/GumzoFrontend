import React, {useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';

//local imports
import AppText from '../../components/text/AppText';
import colors from '../../config/colors';
import FormContext from '../../components/FormContext';
import PrimaryButton from '../../components/button/PrimaryButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

function NativeLanguageScreen({navigation, route}) {
  const [language, setLanguage] = useState(''); // Current input
  const [languages, setLanguages] = useState([]); // List of all languages added
  const languageSchema = yup.object().shape({
    languages: yup.string().required('Native Language is required'),
  });
  // Use FormContext
  const {state, dispatch} = useContext(FormContext);

  // Handle the addition of a new language
  const addLanguage = () => {
    if (language.trim() !== '') {
      setLanguages(prevLanguages => [...prevLanguages, language.trim()]);
      setLanguage(''); // Reset the input field
    }
  };

  const {uid} = route.params;
  const handleContinue = () => {
    const combinedLanguages = languages.join(', ');

    languageSchema
      .validate({languages: combinedLanguages})
      .then(() => {
        dispatch({
          type: 'UPDATE_FIELD',
          payload: {field: 'nativeLanguage', value: combinedLanguages},
        });
        navigation.navigate('UserInterests', {uid});
      })
      .catch(error => {
        alert(error.message); // Notify user about the validation error
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>Native Language</AppText>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your native language"
          value={language}
          onChangeText={setLanguage}
        />
        <TouchableOpacity onPress={addLanguage}>
          <MaterialCommunityIcons
            name="plus-box"
            size={30}
            style={styles.addButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.languages}>
        {languages.map((language, index) => (
          <Text key={index} style={styles.languageText}>
            {language}
          </Text>
        ))}
      </View>
      <PrimaryButton
        label="Continue"
        onPress={handleContinue}
        disabled={languages.length === 0}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    marginLeft: 10,
    alignSelf: 'center',
    color: colors.grannySmithApple,
  },

  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    // flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
    marginBottom: 20,
  },
  languages: {
    marginBottom: 40,
  },
  languageText: {
    borderWidth: 1,
    borderColor: colors.grannySmithApple,
    width: 127,
    height: 50,
    marginTop: 15,
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageItem: {
    padding: 8,
    fontSize: 18,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  title: {
    alignItems: 'flex-start',
    fontSize: 34,
    fontWeight: 700,
    marginBottom: 10,
  },
});

export default NativeLanguageScreen;
