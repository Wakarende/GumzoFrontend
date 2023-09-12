import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {getAuth} from 'firebase/auth';

//Local imports
import AppText from '../../components/AppText';
import BackArrow from '../../components/BackArrow';
import {calculateAge} from '../../utils/calculateAge';
import colors from '../../config/colors';
import EditButton from '../../components/icon/editProfileIcon';
import EditModal from '../../components/EditModal';
import {fetchCurrentUser} from '../../utils/firebaseService';
import firebaseApp from '../../../firebaseConfig';
import {ScrollView} from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {updateBio} from '../../utils/updateProfileUtils';

function AccountInfoScreen({navigation, numberOfLines, adjustFontToFitSize}) {
  //Fetch all users and the current users data
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const currentUser = async () => {
      const auth = getAuth(firebaseApp);
      const userId = auth.currentUser.uid;

      //Fetch data for current user
      const fetchedCurrentUser = await fetchCurrentUser(userId);
      console.log(fetchedCurrentUser);
      //update the state of fetched data.
      setCurrentUser(fetchedCurrentUser);
    };
    currentUser();
  }, []);

  // State for Bio modal visibility
  const [isBioModalVisible, setIsBioModalVisible] = useState(false);

  //Update bio state
  const [tempBio, setTempBio] = useState('');
  const handleUpdateBio = async updatedBio => {
    const auth = getAuth(firebaseApp);
    const userId = auth.currentUser.uid;
    const result = await updateBio(updatedBio);

    if (result.success) {
      setCurrentUser(prevState => ({
        ...prevState,
        bio: updatedBio,
      }));
      Alert.alert('Bio updated successfully');
      setIsBioModalVisible(false);
    } else {
      Alert.alert('Bio not updated');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileImage}>
          <Image
            style={styles.modalImage}
            source={
              currentUser && currentUser.selectedImage
                ? {uri: currentUser.selectedImage}
                : require('../../../assets/profileImg.jpg')
            }
          />
          <BackArrow
            onPress={() => navigation.navigate('Account')}
            style={styles.backArrow}
          />
        </View>
        <View style={styles.profileContainer}>
          {/*username and Age*/}
          <View style={styles.flexContainer}>
            <View style={styles.userInfo}>
              {currentUser && (
                <AppText style={styles.username}>
                  {currentUser.username}
                </AppText>
              )}
              {currentUser && (
                <AppText style={styles.age}>
                  {calculateAge(currentUser.dob)}
                </AppText>
              )}
            </View>
          </View>
          {/*Native Language*/}
          <View style={styles.flexContainer}>
            <View>
              <AppText style={styles.title}>Native Language</AppText>
            </View>
            <View style={styles.editProfileIcon}>
              <EditButton onPress={() => setIsBioModalVisible(true)} />
            </View>
          </View>
          <View>
            {currentUser && (
              <AppText style={styles.text}>
                {currentUser.nativeLanguage}
              </AppText>
            )}
          </View>

          {/*Bio*/}
          <View style={styles.flexContainer}>
            <View>
              <AppText style={styles.title}>Bio</AppText>
            </View>
            <View style={styles.editProfileIcon}>
              <EditButton onPress={() => setIsBioModalVisible(true)} />
            </View>
          </View>
          <View>
            {currentUser && (
              <AppText style={styles.bio} numberOfLines={3}>
                {currentUser.bio}
              </AppText>
            )}
          </View>
          <EditModal
            isVisible={isBioModalVisible}
            onClose={() => setIsBioModalVisible(false)}
            data={currentUser ? currentUser.bio : ''}
            onUpdate={handleUpdateBio}
            sectionTitle="Bio"
          />
          {/*Language Proficiency*/}
          <View style={styles.flexContainer}>
            <View>
              <AppText style={styles.title}>Interests</AppText>
            </View>
            <View style={styles.editProfileIcon}>
              <EditButton onPress={() => setIsBioModalVisible(true)} />
            </View>
          </View>
          <View style={styles.userInterests}>
            {currentUser &&
              currentUser.selectedInterests.map((interestObj, index) => (
                <View key={index} style={styles.interests}>
                  <AppText style={styles.text}>{interestObj.interest}</AppText>
                </View>
              ))}
          </View>
          {/*Learning Goals*/}
          <View style={styles.flexContainer}>
            <View>
              <AppText style={styles.title}>Learning Goals</AppText>
            </View>
            <View style={styles.editProfileIcon}>
              <EditButton onPress={() => setIsBioModalVisible(true)} />
            </View>
          </View>
          <View style={styles.text}>
            {currentUser && (
              <AppText style={styles.text} numberOfLines={3}>
                {currentUser.learningGoals}
              </AppText>
            )}
          </View>
          {/* References
          <View>
            <AppText style={styles.title}>References</AppText>
          </View>
          <View>
            <AppText style={styles.text}>No Reviews yet</AppText>
          </View>
          */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  age: {
    fontSize: 24,
  },
  backArrow: {
    position: 'absolute',
    zIndex: 10,
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  bio: {
    fontSize: 12,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
  },
  interests: {
    borderWidth: 1,
    padding: 3,
    borderColor: colors.grannySmithApple,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
  },
  title: {
    fontWeight: 900,
    color: colors.darkGray,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  profileContainer: {
    paddingHorizontal: 20,
  },
  profileImage: {
    width: '100%',
    height: 400,
    overflow: 'visible',
  },
  modalImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    marginBottom: 30,
  },
  // To make the image circular if you want
  username: {
    fontWeight: 900,
    fontSize: 24,
  },
  userInfo: {
    flexDirection: 'row',
    columnGap: 10,
  },
  userInterests: {
    flexDirection: 'row',
    columnGap: 10,
  },
});
export default AccountInfoScreen;
