import React from 'react';
import {StyleSheet} from 'react-native';
import CreateProfileScreen from '../screens/profilesetup/CreateProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserInfoScreen from '../screens/profilesetup/UserInfoScreen';
import UserInterestsScreen from '../screens/profilesetup/UserInterestsScreen';
const Profile = createNativeStackNavigator();

function ProfileSetupNavigators(props) {
  return (
    <Profile.Navigator initialRouteName="CreateProfile">
      <Profile.Screen name="CreateProfile" component={CreateProfileScreen} />
      <Profile.Screen name="UserInfo" component={UserInfoScreen} />
      <Profile.Screen name="UserInterests" component={UserInterestsScreen} />
    </Profile.Navigator>
  );
}

const styles = StyleSheet.create({});
export default ProfileSetupNavigators;
