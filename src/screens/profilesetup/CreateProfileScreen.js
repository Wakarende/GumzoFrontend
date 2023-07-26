import React from 'react';
import {View, StyleSheet} from 'react-native';
import CreateProfile from '../../components/artworks/CreateProfile';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
function CreateProfileScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <AppText>Create Profile</AppText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default CreateProfileScreen;
