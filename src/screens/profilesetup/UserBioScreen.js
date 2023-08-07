import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import {TextInput} from 'react-native-gesture-handler';
import PrimaryButton from '../../components/PrimaryButton';

function UserBioScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>Bio</AppText>
      <AppText style={styles.text}>
        Tell us a bit more about yourself. Your background, Your learning goals.
        Anything you feel is important for us to know about you!
      </AppText>
      <View>
        <TextInput placeholder="Bio" style={styles.input} />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton label="Submit" />
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
