import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  FlatList,
  GestureHandlerRootView,
  TextInput,
} from 'react-native-gesture-handler';
import {
  collection,
  doc,
  getFirestore,
  where,
  query,
  getDocs,
  getDoc,
} from '@firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//local imports
import colors from '../../config/colors';
import firebaseApp from '../../../firebaseConfig';
import {fetchCurrentUser} from '../../utils/firebaseService';
import ListItem from '../../components/lists/ListItem';
import ListItemSeparator from '../../components/lists/ListItemSeparator';
import Screen from '../../components/Screen';
import {getAuth} from '@firebase/auth';
import AppText from '../../components/AppText';

function ChatsScreen({navigation}) {
  const [matches, setMatches] = useState([]);

  //Function to get and set chat matches for the current user
  const getMatches = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const auth = getAuth(firebaseApp);
      // Get the current user's ID from Firebase Auth
      const userId = auth.currentUser.uid;
      const currentUser = await fetchCurrentUser(userId);

      if (!currentUser || !currentUser.uid) return;

      //Query firestore for matches for the currentUser
      const matchRequestQuery = query(
        collection(db, 'matches'),
        where('user1', '==', currentUser.uid),
      );

      const querySnapshot = await getDocs(matchRequestQuery);

      //Map over query results and retrieve user details for each matched user
      const matchPromises = querySnapshot.docs.map(async matchDoc => {
        const matchedUserId = matchDoc.data().user2;

        const userDoc = await getDoc(doc(db, 'users', matchedUserId));

        if (userDoc.exists) {
          return {
            id: userDoc.id,
            title: userDoc.data().username,
            image: userDoc.data().selectedImage,
          };
        }
        return null;
      });

      //wait for all promises to resolve and update the state with matched users
      const resolvedMatches = await Promise.all(matchPromises);

      setMatches(resolvedMatches.filter(match => match !== null));
    } catch (error) {
      console.log('Error displaying matches: ', error);
    }
  };

  //execute getMatches function when component mounts
  useEffect(() => {
    getMatches();
  }, []);

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <TextInput style={styles.searchBar} />
            <TouchableOpacity onPress={() => console.log('search!')}>
              <MaterialCommunityIcons
                name="magnify"
                color={colors.grannySmithApple}
                size={30}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
          {matches.length === 0 && <AppText>No matches yet!</AppText>}
          <FlatList
            data={matches}
            keyExtractor={match => match.id}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({item}) => (
              <ListItem
                title={item.title}
                imageUrl={item.image}
                onPress={() => {
                  navigation.navigate('SingleChat', {otherUserId: item.id});
                }}
              />
            )}
          />
        </View>
      </Screen>
    </GestureHandlerRootView>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
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
});
export default ChatsScreen;
