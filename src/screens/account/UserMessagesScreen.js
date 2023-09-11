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
import AppText from '../../components/AppText';
import BackArrow from '../../components/BackArrow';
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
          console.log('Match request from Firestore: ', snapshot.docs);
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
                // senderAge: senderDetails.dob,
                // senderNativeLanguage: senderDetails.nativeLanguage,
                // senderInterests: senderDetails.selectedInterests,
                // senderLearningGoals: senderDetails.learningGoals,
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

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [currentUser, firestore]);

  //List of matches
  const matches = matchRequests.map(request => ({
    title: `Match request from ${request.senderName}`,
    image: request.senderProfileImage,
    senderId: request.senderId,
    requestId: request.id,
  }));

  //modal
  //Local state to manage the modal for user details
  const [selectedUser, setSelectedUser] = useState(null);

  //Logic to accept match request
  const acceptMatch = async (requestId, senderId) => {
    try {
      //Create a new match in the matches collection
      const matchRef = collection(firestore, 'matches');
      await addDoc(matchRef, {
        user1: currentUserId,
        user2: senderId,
        timestamp: new Date().toISOString(),
      });
      //Update the original request from matchRequests collection
      const requestRef = doc(firestore, 'matchRequests', requestId);
      await updateDoc(requestRef, {
        status: 'accepted',
      });
      console.log('Match accepted and Document successfully update!');
    } catch (error) {
      console.error('Error handling match approval: ', error);
    }
  };

  //Logic to deny match request
  const denyMatchRequest = async (requestId, senderId) => {
    console.log(
      `Denying request with ID: ${requestId} from sender: ${senderId}`,
    );
    try {
      //Update matchRequest in matchRequest collection
      const requestRef = doc(firestore, 'matchRequests', requestId);
      await updateDoc(requestRef, {
        status: 'denied',
      });
      console.log('Match request denied!');
    } catch (error) {
      console.log('Error handling match denial:', error);
    }
  };
  return (
    <Screen>
      <BackArrow
        onPress={() => navigation.navigate('Account')}
        style={styles.backArrow}
      />
      <View style={styles.container}>
        {matchRequests.length === 0 && currentUser && (
          <AppText>No messages</AppText>
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
                      acceptMatch(item.requestId, item.senderId);
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
                      denyMatchRequest(item.requestId, item.senderId);
                    },
                  },
                ]}
              />
            </View>
          )}
        />
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
  },
});

export default UserMessagesScreen;
