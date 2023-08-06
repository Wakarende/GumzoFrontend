import React from 'react';
import CreateProfileScreen from '../src/screens/profilesetup/CreateProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserInfoScreen from '../src/screens/profilesetup/UserInfoScreen';
import UserInterestsScreen from '../src/screens/profilesetup/UserInterestsScreen';
import LanguageProficiencyScreen from '../src/screens/profilesetup/LanguageProficiencyScreen';
import UserBioScreen from '../src/screens/profilesetup/UserBioScreen';
const Profile = createNativeStackNavigator();

function ProfileSetupNavigators(props) {
  return (
    <Profile.Navigator initialRouteName="CreateProfile">
      <Profile.Screen name="CreateProfile" component={CreateProfileScreen} />
      <Profile.Screen name="UserInfo" component={UserInfoScreen} />
      <Profile.Screen name="UserInterests" component={UserInterestsScreen} />
      <Profile.Screen
        name="LanguageProficiency"
        component={LanguageProficiencyScreen}
      />
      <Profile.Screen name="UserBio" component={UserBioScreen} />
    </Profile.Navigator>
  );
}

export default ProfileSetupNavigators;
