import React from 'react';
import CreateProfileScreen from '../screens/profilesetup/CreateProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserInfoScreen from '../screens/profilesetup/UserInfoScreen';
import UserInterestsScreen from '../screens/profilesetup/UserInterestsScreen';
import LanguageProficiencyScreen from '../screens/profilesetup/LanguageProficiencyScreen';
import UserBioScreen from '../screens/profilesetup/UserBioScreen';
import UserLearningGoalsScreen from '../screens/profilesetup/UserLearningGoalsScreen';
import NativeLanguageScreen from '../screens/profilesetup/NativeLanguageScreen';
const Profile = createNativeStackNavigator();

function ProfileSetupNavigators(props) {
  return (
    <Profile.Navigator initialRouteName="CreateProfile">
      <Profile.Screen name="CreateProfile" component={CreateProfileScreen} />
      <Profile.Screen name="UserInfo" component={UserInfoScreen} />
      <Profile.Screen name="NativeLanguage" component={NativeLanguageScreen} />
      <Profile.Screen name="UserInterests" component={UserInterestsScreen} />
      <Profile.Screen
        name="LanguageProficiency"
        component={LanguageProficiencyScreen}
      />
      <Profile.Screen
        name="UserLearningGoals"
        component={UserLearningGoalsScreen}
      />
      <Profile.Screen name="UserBio" component={UserBioScreen} />
    </Profile.Navigator>
  );
}

export default ProfileSetupNavigators;
