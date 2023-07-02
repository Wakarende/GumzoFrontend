import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

//Local imports
import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import ProfileListItem from '../components/ProfileListItem';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';
import colors from '../config/colors';
function AccountScreen(props) {
  return (
    <Screen style={styles.container}>
      <ProfileListItem
        title="JKjk"
        image={require('../assets/profile.jpg')}
        style={styles.profile}
      />
      <View style={styles.content}>
        <ListItem
          title="Account Details"
          IconComponent={
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={30}
              color={colors.mediumGray}
            />
          }
        />
        <AppButton title="logout" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  content: {flex: 1},
  icon: {},
});
export default AccountScreen;
