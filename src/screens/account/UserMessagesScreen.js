import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import AppText from '../../components/AppText';
import BackArrow from '../../components/BackArrow';
import Screen from '../../components/Screen';
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

//Local imports
import firebaseApp from '../../../firebaseConfig';
import {fetchCurrentUser} from '../../utils/firebaseService';
import ListItem from '../../components/lists/ListItem';
import ListItemSeparator from '../../components/lists/ListItemSeparator';

const DEFAULT_PROFILE_IMAGE_URL = require('../../../assets/Profile.png');
function UserMessagesScreen({navigation}) {
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
      const userRef = doc(firestore, 'users', userId); // Assuming your users collection is named 'users'
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        return {
          username: userData.username,
          profileImage: userData.selectedImage
            ? userData.selectedImage
            : DEFAULT_PROFILE_IMAGE_URL,
        };
        // userSnap.data();
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
                senderProfileImage: senderDetails.profileImage,
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
    targetScreen: 'MatchRequestUserInfo',
  }));

  //modal
  //Local state to manage the modal for user details
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Screen>
      <BackArrow onPress={() => navigation.navigate('Account')} />
      <View style={styles.container}>
        <AppText>Match Requests</AppText>
        {matchRequests.length === 0 && currentUser && (
          <AppText>No match requests</AppText>
        )}
        <FlatList
          data={matches}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              image={item.image}
              showArrow={false}
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default UserMessagesScreen;
