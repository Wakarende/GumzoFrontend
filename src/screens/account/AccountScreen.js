import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {getAuth} from 'firebase/auth';
import firebaseApp from '../../../firebaseConfig';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
//local imports
import colors from '../../config/colors';
import Icon from '../../components/icon/Icon';
import {initializeNotificationListener} from '../../utils/notificationsLogic';
import ListItem from '../../components/lists/ListItem';
import ListItemSeparator from '../../components/lists/ListItemSeparator';
import Screen from '../../components/Screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NotificationBadge from '../../components/NotificationBadge';
import useMatchesCount from '../../utils/MatchesCount';
import {MaterialCommunityIcons} from '../../../mocks/@expo-vector-icon-mocks';
import {logout} from '../../utils/authUtils';
import {pickImage} from '../../utils/imagePicker';
import {uploadImage} from '../../utils/uploadImage';
import {updateUserProfile} from '../../utils/updateUserProfile';

function AccountScreen({navigation}) {
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
      onPress: () => logout(() => navigation.navigate('LogInScreen')),
    },
  ];

  // initializing state variable, this will be used to track if Firebase
  // is done checking if a user session exists
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState(null);

  //State to store notification count
  const [notifications, setNotifications] = useState(0);

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
  const fetchedImageUrl = user?.selectedImage;

  //Edit profile image:
  const handleProfileImageEdit = async () => {
    const uri = await pickImage();
    if (uri) {
      try {
        const downloadURL = await uploadImage(uri, user.uid);
        await updateUserProfile(user.uid, {selectedImage: downloadURL});
        setUser(prevState => ({...prevState, selectedImage: downloadURL}));
      } catch (error) {
        console.error('Error updating profile image: ', error);
      }
    }
  };

  useEffect(() => {
    let unsubscribeFromUpdates;
    if (user) {
      unsubscribeFromUpdates = initializeNotificationListener(
        getFirestore(firebaseApp),
        user,
        setNotifications,
      );
    }
    return () => {
      if (unsubscribeFromUpdates) {
        unsubscribeFromUpdates();
      }
    };
  }, [user]);
  return (
    <Screen style={styles.screen}>
      <TouchableOpacity>
        <View style={styles.container}>
          <ListItem
            title={user ? user.username : ''}
            imageUrl={fetchedImageUrl}
            showArrow={false}
            isProfile={true}
            endIcon={{
              name: 'square-edit-outline',
              size: 30,
              color: colors.grannySmithApple,
              onPress: handleProfileImageEdit,
            }}
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
                  {item.title === 'My Messages' && notifications > 0 && (
                    <NotificationBadge count={notifications} />
                  )}
                </View>
              }
              onPress={() => {
                if (item.targetScreen) {
                  navigation.navigate(item.targetScreen);
                } else if (item.onPress && typeof item.onPress === 'function') {
                  item.onPress();
                }
              }}
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
