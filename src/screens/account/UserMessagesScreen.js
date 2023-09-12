import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getAuth} from 'firebase/auth';
import {
  addDoc,
  getDoc,
  doc,
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
} from '@firebase/firestore';
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
          profileImage: userData.selectedImage
            ? userData.selectedImage
            : DEFAULT_PROFILE_IMAGE_URL,
        };
      } else {
        console.error('User not found: ', userId);
        return null;
      }
    }
    // Strengthening the guard clause
    if (!currentUser || !currentUser.uid) return;

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
                senderProfileImage: senderDetails.selectedImage,
                senderAge: senderDetails.dob,
                senderNativeLanguage: senderDetails.nativeLanguage,
                senderInterests: senderDetails.selectedInterests,
                senderBio: senderDetails.bio,
                senderLearningGoals: senderDetails.learningGoals,
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
    image: request.senderProfileImage,
    senderId: request.senderId,
    requestId: request.id,
  }));

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
  // //Logic to accept match request

  // //Logic to deny match request
  // const denyMatchRequest = async (requestId, senderId) => {
  //   console.log(
  //     `Denying request with ID: ${requestId} from sender: ${senderId}`,
  //   );
  //   try {
  //     //Update matchRequest in matchRequest collection
  //     const requestRef = doc(firestore, 'matchRequests', requestId);
  //     await updateDoc(requestRef, {
  //       status: 'denied',
  //     });
  //     console.log('Match request denied!');
  //   } catch (error) {
  //     console.log('Error handling match denial:', error);
  //   }
  // };
  return (
    <Screen>
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
});

export default UserMessagesScreen;
