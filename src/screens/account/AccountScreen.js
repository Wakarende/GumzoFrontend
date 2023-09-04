import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {getAuth} from 'firebase/auth';
import firebaseApp from '../../../firebaseConfig';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
//local imports
import colors from '../../config/colors';
import Icon from '../../components/icon/Icon';
import ListItem from '../../components/lists/ListItem';
import ListItemSeparator from '../../components/lists/ListItemSeparator';
import Screen from '../../components/Screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NotificationBadge from '../../components/NotificationBadge';

//Data displayed on flatlist
const menuItems = [
  {
    title: 'Account Settings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.grannySmithApple,
    },
    targetScreen: 'AccountInfo',
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: colors.grannySmithApple,
    },
    targetScreen: 'UserMessages',
  },
  {
    title: 'Log Out',
    icon: {
      name: 'logout',
      backgroundColor: colors.grannySmithApple,
    },
  },
];

function AccountScreen({navigation}) {
  // initializing state variable, this will be used to track if Firebase
  // is done checking if a user session exists
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState(null);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    user => {
      setUser(user);
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        // Fetch user document from Firestore
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        // If the document exists, set the data to the user state
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log('No such document!');
        }
      };

      fetchUser();
    }
  }, [user]);
  return (
    <Screen style={styles.screen}>
      <TouchableOpacity>
        <View style={styles.container}>
          <ListItem
            title={user ? user.username : ''}
            image={require('../../../assets/Profile.png')}
            showArrow={false}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              IconComponent={
                <View>
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                  {item.title === 'My Messages' && (
                    <NotificationBadge count={3} />
                  )}
                </View>
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    marginVertical: 10,
  },
});

export default AccountScreen;
