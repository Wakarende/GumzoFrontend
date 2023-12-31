import React from 'react';
import {View, StyleSheet} from 'react-native';
import CreateProfile from '../../components/artworks/CreateProfile';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../../components/text/AppText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ProfileBackground from '../../components/artworks/ProfileBackground';
import PrimaryButton from '../../components/button/PrimaryButton';
import colors from '../../config/colors';

function CreateProfileScreen({navigation, route}) {
  // User ID is extracted from navigation parameters
  const {uid} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ProfileBackground />
      <View style={styles.profileContainer}>
        <CreateProfile width={200} height={200} />
      </View>
      <View style={styles.textContainer}>
        <AppText style={styles.title}>Create Profile</AppText>
        <AppText style={styles.text}>Let's get your profile setup</AppText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserInfo', {uid});
          }}>
          <PrimaryButton label="Get Started" style={styles.button} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

//stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    position: 'absolute',
    top: '30%',
    left: '40%',
    marginTop: -150,
    marginLeft: -150,
  },
  textContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.lightGray,
  },
  title: {
    color: colors.darkGray,
  },

  button: {
    width: 150,
    height: 60,
  },
});
export default CreateProfileScreen;
