import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getAuth} from 'firebase/auth';
import {
  getDoc,
  doc,
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from '@firebase/firestore';
('react-native-gesture-handler');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Local imports
import AppText from '../../components/text/AppText';
import {acceptMatch, denyMatchRequest} from '../../utils/matchUtils';
import BackArrow from '../../components/arrow/BackArrow';
import colors from '../../config/colors';
import Screen from '../../components/Screen';
import firebaseApp from '../../../firebaseConfig';
import {fetchCurrentUser} from '../../utils/firebaseService';
import ListItem from '../../components/lists/ListItem';
import ListItemSeparator from '../../components/lists/ListItemSeparator';
import {calculateAge} from '../../utils/calculateAge';
const DEFAULT_PROFILE_IMAGE_URL = require('../../../assets/Profile.png');

function UserMessagesScreen({navigation, numberOfLines, adjustsFontSizeToFit}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [matchRequests, setMatchRequests] = useState([]);
  const [acceptedMatchRequests, setAcceptedMatchRequests] = useState([]);
  const [deniedMatchRequests, setDeniedMatchRequests] = useState([]);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  console.log(firestore);
  const currentUserId = auth.currentUser?.uid;

  //State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Check if currentUserId exists
    if (!currentUserId) return;

    const fetchUser = async () => {
      try {
        const user = await fetchCurrentUser(currentUserId);
        if (user && user.uid) {
          // Check if user and user.uid are available
          console.log('fetched user UID: ', user.uid);
        }
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user: ', error);
      }
    };

    fetchUser();
  }, [currentUserId]);

  //Fetches match Request
  useEffect(() => {
    //Fetch user details using senderID
    async function fetchUserDetails(userId) {
      const userRef = doc(firestore, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        return {
          username: userData.username,
          image: userData.selectedImage
            ? userData.selectedImage
            : DEFAULT_PROFILE_IMAGE_URL,
          dob: userData.dob,
          nativeLanguage: userData.nativeLanguage,
          selectedInterests: userData.selectedInterests,
          bio: userData.bio,
          learningGoals: userData.learningGoals,
        };
      } else {
        console.error('User not found: ', userId);
        return null;
      }
    }
    // Strengthening the guard clause
    if (!currentUser || !currentUser.uid) return;

    console.log();
    const matchRequestRef = query(
      collection(firestore, 'matchRequests'),
      where('recieverId', '==', currentUser.uid),
      where('status', '==', 'pending'),
    );
    const unsubscribe = onSnapshot(
      matchRequestRef,
      async snapshot => {
        if (!snapshot.empty) {
          const requests = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          //Fetch user details for each sender
          const augmentedRequests = [];
          for (let request of requests) {
            const senderDetails = await fetchUserDetails(request.senderId);
            if (senderDetails) {
              augmentedRequests.push({
                ...request,
                senderName: senderDetails.username,
                image: senderDetails.selectedImage,
                senderAge: senderDetails.dob,
                nativeLanguage: senderDetails.nativeLanguage,
                selectedInterests: senderDetails.selectedInterests,
                bio: senderDetails.bio,
                learningGoals: senderDetails.learningGoals,
              });
            }
          }
          setMatchRequests(augmentedRequests);
        } else {
          console.log('No match requests found for user: ', currentUser.uid);
        }
      },
      error => {
        console.error('Error fetching match requests:', error);
      },
    );

    const acceptedMatchRequestsRef = query(
      collection(firestore, 'matchRequests'),
      where('recieverId', '==', currentUser.uid),
      where('status', '==', 'accepted'),
    );

    const unsubscribedAccepted = onSnapshot(
      acceptedMatchRequestsRef,
      async snapshot => {
        if (!snapshot.empty) {
          const requests = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          const augmentedAcceptedRequests = [];
          for (let request of requests) {
            const senderDetails = await fetchUserDetails(request.senderId);
            if (senderDetails) {
              augmentedAcceptedRequests.push({
                ...request,
                senderName: senderDetails.username,
              });
            }
          }
          setAcceptedMatchRequests(augmentedAcceptedRequests);
        }
      },
    );

    const deniedMatchRequestRef = query(
      collection(firestore, 'matchRequests'),
      where('senderId', '==', currentUser.uid),
      where('status', '==', 'denied'),
    );
    const unsubscribeDenied = onSnapshot(
      deniedMatchRequestRef,
      async snapshot => {
        if (!snapshot.empty) {
          const requests = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          const augmentedDeniedRequests = [];
          for (let request of requests) {
            const senderDetails = await fetchUserDetails(request.senderId);
            if (senderDetails) {
              augmentedDeniedRequests.push({
                ...request,
                senderName: senderDetails.username,
              });
            }
          }
          setDeniedMatchRequests(augmentedDeniedRequests);
        }
      },
    );

    // Cleanup listener on unmount
    return () => {
      unsubscribe();
      unsubscribedAccepted();
      unsubscribeDenied();
    };
  }, [currentUser, firestore]);

  //List of matches
  const matches = matchRequests.map(request => ({
    title: `Match request from ${request.senderName}`,
    username: request.senderName,
    image: request.image,
    age: request.senderAge,
    bio: request.bio,
    nativeLanguage: request.nativeLanguage,
    interests: request.selectedInterests,
    learningGoals: request.learningGoals,
    senderId: request.senderId,
    requestId: request.id,
  }));
  console.log('senderDetails:', matches);
  const acceptedMatches = acceptedMatchRequests.map(request => ({
    title: `${request.senderName} has accepted your match request`,
    senderId: request.senderId,
    requestId: request.id,
  }));

  const deniedMatches = deniedMatchRequests.map(request => ({
    title: `${request.senderName} has denied your match request`,
    senderId: request.senderId,
    requestId: request.id,
  }));
  //modal
  //Local state to manage the modal for user details
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAccept = async (requestId, senderId) => {
    await acceptMatch(requestId, senderId, firestore, currentUserId);
  };

  const handleDeny = async (requestId, senderId) => {
    await denyMatchRequest(requestId, senderId, firestore);
  };
  return (
    <Screen>
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
                    selectedUser && selectedUser.image
                      ? {uri: selectedUser.image}
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
                <MaterialCommunityIcons name="close-box-outline" size={30} />
              </Pressable>
              <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
                {/* Modal Text*/}
                <View style={styles.modalText}>
                  {/* Modal user info*/}
                  {/* Username & Age*/}
                  <View style={styles.user}>
                    <AppText style={styles.modalUsername}>
                      {selectedUser ? selectedUser.username : ''}
                    </AppText>
                    <AppText style={styles.modalAge}>
                      {selectedUser ? calculateAge(selectedUser.age) : ''}
                    </AppText>
                  </View>
                  {/* Native Languages */}
                  <AppText style={styles.title}>Native Languages</AppText>
                  <AppText style={styles.userInfo}>
                    {selectedUser ? selectedUser.nativeLanguage : ''}
                  </AppText>
                  {/* Bio*/}
                  <AppText style={styles.title}>Bio</AppText>
                  <AppText style={styles.modalBio}>
                    {selectedUser ? selectedUser.bio : ''}
                  </AppText>
                  {/* User Interests*/}
                  <AppText style={styles.title}>Interests</AppText>
                  <View style={styles.userInterestsFlex}>
                    {selectedUser &&
                      selectedUser.interests &&
                      selectedUser.interests.map((interestObj, index) => (
                        <View key={index}>
                          <AppText style={styles.userInterests}>
                            {interestObj.interest}
                          </AppText>
                        </View>
                      ))}
                  </View>
                  {/* Learning Goals*/}
                  <AppText style={styles.title}>Learning Goals</AppText>
                  <AppText style={styles.userInfo}>
                    {selectedUser
                      ? selectedUser.learningGoals
                      : 'No learning goals set'}
                  </AppText>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
      <BackArrow
        onPress={() => navigation.navigate('Account')}
        style={styles.backArrow}
      />
      <View style={styles.container}>
        {matchRequests.length === 0 && currentUser && (
          <AppText style={styles.matches}>No Request matches</AppText>
        )}
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={matches}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({item}) => (
            <View style={styles.matchFlex}>
              <ListItem
                title={item.title}
                image={item.image}
                showArrow={false}
                endIcons={[
                  {
                    name: 'check',
                    color: colors.grannySmithApple,
                    size: 25,
                    onPress: () => {
                      console.log(
                        'ID:',
                        item.requestId,
                        'SenderID:',
                        item.senderId,
                      );
                      handleAccept(item.requestId, item.senderId);
                    },
                  },
                  {
                    name: 'close',
                    color: colors.red,
                    size: 25,
                    onPress: () => {
                      console.log(
                        'ID: ',
                        item.requestId,
                        'senderID: ',
                        item.senderId,
                      );
                      handleDeny(item.requestId, item.senderId);
                    },
                  },
                ]}
                onPress={() => {
                  console.log('Selected User:', item);
                  setSelectedUser(item);
                  setIsModalVisible(true);
                }}
              />
            </View>
          )}
        />
        <View>
          {acceptedMatchRequests.length > 0 && (
            <AppText style={styles.matches}>Accepted Matches</AppText>
          )}
          <FlatList
            data={acceptedMatches}
            keyExtractor={item => item.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({item}) => (
              <ListItem title={item.title} showArrow={false} />
            )}
          />
        </View>
        <View>
          {deniedMatchRequests.length > 0 && (
            <AppText style={styles.matches}>Denied Matches</AppText>
          )}
          <FlatList
            data={deniedMatches}
            keyExtractor={item => item.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({item}) => (
              <ListItem title={item.title} showArrow={false} />
            )}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    position: 'absolute',
    zIndex: 10,
    top: 10,
    left: 10,
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  matches: {
    fontWeight: 900,
    color: colors.darkGray,
    marginTop: 10,
    marginBottom: 10,
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

export default UserMessagesScreen;
