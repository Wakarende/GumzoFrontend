import React, {useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//local imports
import AppText from '../../components/text/AppText';
import colors from '../../config/colors';
import FormContext from '../../components/FormContext';
import PrimaryButton from '../../components/button/PrimaryButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

function NativeLanguageScreen({navigation, route}) {
  const [language, setLanguage] = useState(''); // Current input
  const [languages, setLanguages] = useState([]); // List of all languages added

  // Use FormContext
  const {state, dispatch} = useContext(FormContext);

  // Handle the addition of a new language
  const addLanguage = () => {
    if (language.trim() !== '') {
      setLanguages(prevLanguages => [...prevLanguages, language.trim()]);
      setLanguage(''); // Reset the input field
    }
  };
  //user id is extracted from navigation parameters
  const {uid} = route.params;
  const handleContinue = () => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'nativeLanguage', value: languages.join(', ')}, // Storing languages as a comma-separated string
    });
    // If you want to use uid, it's available as route.params.uid
    // navigation.navigate('NextScreen', { uid: route.params.uid });
    navigation.navigate('UserInterests', {uid}); // Update 'NextScreen' to wherever you want to navigate after this.
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
      <PrimaryButton label="Continue" onPress={handleContinue} />
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
