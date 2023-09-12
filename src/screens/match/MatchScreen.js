import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper';

//local imports
import AppText from '../../components/text/AppText';
import colors from '../../config/colors';
import {getPotentialMatches} from '../../utils/matchingUtils';
import {calculateAge} from '../../utils/calculateAge';
import {sendMatchRequest} from '../../utils/matchRequestUtils';
import {useUsersData} from '../../hooks/useUsersData';

function MatchScreen({navigation, adjustsFontSizeToFit, numberOfLines}) {
  //state to manage the notifications count:
  const [notificationCount, setNotificationCount] = useState(0);
  const [matchRequests, setMatchRequests] = useState([]);

  // Fetch users anda the current user using a custom hook
  const {users, currentUser} = useUsersData();

  //Calculate potential matches based on current user's profile
  const potentialMatches = currentUser
    ? getPotentialMatches(currentUser, users)
    : [];

  //Function to handle sending of match requests
  const handleSendRequest = async () => {
    try {
      const result = await sendMatchRequest(selectedUser, currentUser);
      if (result.status === 'already_exists') {
        Alert.alert('You have already sent a request to the user.');
      } else if (result.status === 'success') {
        Alert.alert('Match Request and Notification Sent!');
      } else if (result.status === 'notification_failed') {
        Alert.alert('Match Request Sent!');
      }
    } catch (error) {
      console.error('Error sending match request: ', error);
      Alert.alert('Request Failed');
    }
  };

  //  Update notification count when matchRequests changes
  useEffect(() => {
    setNotificationCount(matchRequests.length);
  }, [matchRequests]);

  //Local state to manage user details modal visibility
  const [selectedUser, setSelectedUser] = useState(null);

  //Function for displaying each user on the list
  const renderUserItem = ({item}) => (
    <TouchableOpacity onPress={() => setSelectedUser(item)}>
      <Card style={styles.matchesCard}>
        <View style={styles.cardOverlayContainer}>
          <Card.Cover
            source={
              item.selectedImage
                ? {uri: item.selectedImage}
                : item.profilePicture
                ? {uri: item.profilePicture}
                : require('../../../assets/profileImg.jpg')
            }
          />
          <AppText
            style={styles.usernameOverlay}
            numberOfLines={numberOfLines}
            adjustsFontSizeToFit={adjustsFontSizeToFit}>
            {item.username}
          </AppText>
        </View>
      </Card>
    </TouchableOpacity>
  );
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            {potentialMatches.length === 0 && currentUser && (
              <AppText>No potential matches found</AppText>
            )}
            <FlatList
              numColumns={2}
              data={potentialMatches}
              keyExtractor={item => item.id}
              renderItem={renderUserItem}
              style={styles.renderUsers}
              columnWrapperStyle={styles.columnWrapper}
              scrollEnabled={false}
            />
            {/* Modal */}
            <View style={styles.modalContainer}>
              <Modal
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={!!selectedUser}
                onRequestClose={() => {
                  console.log('Modal has been closed');
                  setSelectedUser(null);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.modalImageContainer}>
                      <Image
                        style={styles.modalImage}
                        source={
                          selectedUser && selectedUser.selectedImage
                            ? {uri: selectedUser.selectedImage}
                            : require('../../../assets/profileImg.jpg')
                        }
                      />
                    </View>
                    {/* Close Modal Icon*/}
                    <Pressable
                      style={styles.closeModal}
                      onPress={() => {
                        setSelectedUser(null);
                      }}>
                      <MaterialCommunityIcons
                        name="close-box-outline"
                        size={30}
                      />
                    </Pressable>
                    <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
                      {/* Modal Text*/}
                      <View style={styles.modalText}>
                        {/* Modal make request and deny match icons*/}
                        <View style={styles.icons}>
                          <TouchableOpacity
                            style={styles.addMatch}
                            onPress={handleSendRequest}>
                            <MaterialCommunityIcons
                              name="account-multiple-plus-outline"
                              size={30}
                              style={styles.matchIcons}
                            />
                          </TouchableOpacity>
                        </View>
                        {/* Modal user info*/}
                        {/* Username & Age*/}
                        <View style={styles.user}>
                          <AppText style={styles.modalUsername}>
                            {selectedUser ? selectedUser.username : 'username'}
                          </AppText>
                          <AppText style={styles.modalAge}>
                            {selectedUser
                              ? calculateAge(selectedUser.dob)
                              : 'Age not available'}
                          </AppText>
                        </View>
                        {/* Native Languages */}
                        <AppText style={styles.title}>Native Languages</AppText>
                        <AppText style={styles.userInfo}>
                          {selectedUser
                            ? selectedUser.nativeLanguage
                            : 'No native language provided'}
                        </AppText>
                        {/* Bio*/}
                        <AppText style={styles.title}>Bio</AppText>
                        <AppText style={styles.modalBio}>
                          {selectedUser ? selectedUser.bio : 'bio'}
                        </AppText>
                        {/* User Interests*/}
                        <AppText style={styles.title}>Interests</AppText>
                        <View style={styles.userInterestsFlex}>
                          {selectedUser &&
                            selectedUser.selectedInterests.map(
                              (interestObj, index) => (
                                <View key={index}>
                                  <AppText style={styles.userInterests}>
                                    {interestObj.interest}
                                  </AppText>
                                </View>
                              ),
                            )}
                        </View>
                        {/* Learning Goals*/}
                        <AppText style={styles.title}>Learning Goals</AppText>
                        <AppText style={styles.userInfo}>
                          {selectedUser
                            ? selectedUser.learningGoals
                            : 'No learning goals set'}
                        </AppText>
                        {/* References
                        <AppText style={styles.title}>References</AppText>
                        */}
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnWrapper: {
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  rootView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGray,
    overflow: 'visible',
  },
  searchBar: {
    paddingLeft: 20,
    paddingRight: 60,
    width: '90%',
  },
  iconContainer: {
    position: 'absolute',
    right: 5,
    flex: 1,
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    resizeMode: 'cover',
  },
  usernameOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  matchesCard: {
    margin: 10,
    elevation: 10,
    backgroundColor: colors.white,
    width: 140,
    height: 160,
    flex: 1,
  },
  renderUsers: {
    flexGrow: 1,
    paddingHorizontal: 5,
  },
  username: {
    marginLeft: 10,
  },
  //  modal styles
  addMatch: {
    borderWidth: 1,
    padding: 24,
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    backgroundColor: colors.grannySmithApple,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModal: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: colors.darkGray,
    zIndex: 1,
  },
  denyMatch: {
    borderWidth: 1,
    padding: 24,
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    backgroundColor: colors.red,
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    columnGap: 20,
    justifyContent: 'space-evenly',
    color: colors.darkGray,
  },
  matchIcons: {
    color: colors.white,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalImageContainer: {
    width: '100%',
    height: '40%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  modalText: {
    marginTop: 10,
  },

  modalUsername: {
    fontSize: 24,
    fontWeight: 900,
    color: colors.darkGray,
    marginRight: 20,
  },
  modalBio: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontWeight: 900,
    color: colors.darkGray,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    fontSize: 16,
  },
  userInterests: {
    fontSize: 16,
    marginRight: 20,
    borderWidth: 1,
    borderColor: colors.grannySmithApple,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  userInterestsFlex: {
    flexDirection: 'row',
  },
});

export default MatchScreen;
