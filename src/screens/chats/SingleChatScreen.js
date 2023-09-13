// import React, {useState, useEffect} from 'react';
// import {GiftedChat} from 'react-native-gifted-chat';
// import {View, StyleSheet} from 'react-native';

// //local imports
// import CustomChatInput from '../../components/inputs/CustomChatInput';
// import AudioMessagePlayer from '../../components/AudioMessagePlayer';
// import BackArrow from '../../components/BackArrow';
// import ChatActions from '../../components/ChatActions';
// import ChatBubble from '../../components/ChatBubble';
// import {useAudioRecording} from '../../hooks/useAudioRecording';
// import {useFirebaseChat} from '../../hooks/useFirebaseChat';

// function SingleChatScreen({navigation, route}) {
//   const [isUnloaded, setIsUnloaded] = useState(false);

//   // const [messages, setMessages] = useState([]);
//   // const [userId, setUserId] = useState(null);
//   const otherUserId = route.params.otherUserId;
//   console.log('Other User ID:', otherUserId);

//   // Use the custom hook for audio recording logic
//   const {
//     recording,
//     isRecording,
//     audioURI,
//     isAudioReadyToSend,
//     startRecording,
//     stopRecording,
//     sendAudioMessage,
//   } = useAudioRecording();

//   // Use the custom hook for Firebase chat management
//   const {messages, userId, onSend} = useFirebaseChat(otherUserId);

//   useEffect(() => {
//     return () => {
//       //stop and unload the recording when the component unmounts if it's currently recording
//       if (isRecording && recording && !isUnloaded) {
//         recording.stopAndUnloadAsync().then(() => {
//           setIsUnloaded(true);
//         });
//       }
//     };
//   }, [isRecording, recording, isUnloaded]);

//   console.log('Messages: ', messages);
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <BackArrow
//           onPress={() => navigation.navigate('Chats')}
//           style={styles.backArrow}
//         />
//       </View>
//       <GiftedChat
//         messages={messages}
//         renderActions={() => (
//           <ChatActions
//             onStartRecording={startRecording}
//             onStopRecording={stopRecording}
//           />
//         )}
//         onSend={messages => onSend(messages)}
//         user={{
//           _id: userId,
//         }}
//         renderInputToolbar={props => (
//           <CustomChatInput
//             {...props}
//             onSendMessage={onSend}
//             startRecording={startRecording}
//             stopRecording={stopRecording}
//             isAudioReadyToSend={isAudioReadyToSend}
//             userId={userId}
//             otherUserId={otherUserId}
//           />
//         )}
//         renderMessageAudio={message => (
//           <AudioMessagePlayer audioURL={message.currentMessage.audio} />
//         )}
//         style={styles.giftedChat}
//         renderBubble={props => <ChatBubble {...props} />}
//       />
//     </View>
//   );
// }

// //Stylesheet
// const styles = StyleSheet.create({
//   backArrow: {
//     position: 'absolute',
//     zIndex: 10,
//     top: 10,
//     left: 10,
//     backgroundColor: 'rgba(255,255,255,0.6)',
//   },
//   container: {
//     flex: 1,
//     // paddingVertical: 3
//     paddingBottom: 30,
//     justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   giftedChat: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     columnGap: 5,
//     width: 100,
//   },
// });
// export default SingleChatScreen;

import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import {Audio} from 'expo-av';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
// import * as firebase from 'firebase';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from '@firebase/firestore';

//local imports
import CustomChatInput from '../../components/inputs/CustomChatInput';
import AudioMessagePlayer from '../../components/AudioMessagePlayer';
import BackArrow from '../../components/arrow/BackArrow';
import firebaseApp from '../../../firebaseConfig';
import {generateChatId} from '../../utils/chatUtils';
import {fetchCurrentUser} from '../../utils/firebaseService';
import {getAuth} from '@firebase/auth';

function SingleChatScreen({navigation, route}) {
  //debugging
  console.log('SingleChatScreen is rendering');
  //Instantiate a new Recording
  const [recording, setRecording] = useState(null); // New state for recording
  const [isRecording, setIsRecording] = useState(false); //State to track if currently recording
  const [audioURI, setAudioURI] = useState(null); //save recording
  //State to track if audio message is ready to send
  const [isAudioReadyToSend, setIsAudioReadyToSend] = useState(false);
  const [isUnloaded, setIsUnloaded] = useState(false);

  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  // const [otherUserId, setOtherUserId] = useState(
  //   navigation.getParam('otherUserId'),
  // );
  const otherUserId = route.params.otherUserId;
  console.log('Other User ID:', otherUserId);

  //Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth(firebaseApp);
      const currentUser = auth.currentUser;
      console.log('current user', currentUser.uid);
      if (currentUser) {
        setUserId(currentUser.uid);
        console.log('Fetched User ID:', currentUser.uid);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    return () => {
      //stop and unload the recording when the component unmounts if it's currently recording
      if (isRecording && recording && !isUnloaded) {
        recording.stopAndUnloadAsync().then(() => {
          setIsUnloaded(true);
        });
      }
    };
  }, [isRecording, recording, isUnloaded]); //Include dependencies

  //Listener that listens to new messages in the chat room in real-time
  useEffect(() => {
    if (userId && otherUserId) {
      const chatId = generateChatId(userId, otherUserId); // Implement this function
      const db = getFirestore(firebaseApp);

      const messagesQuery = query(
        collection(db, `chats/${chatId}/messages`),
        orderBy('createdAt', 'desc'),
      );

      // Listen for real-time updates
      const unsubscribe = onSnapshot(messagesQuery, snapshot => {
        let newMessages = [];
        console.log('docChanges:', snapshot.docChanges());
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            newMessages.push(change.doc.data());
          }
        });
        setMessages(prevMessages =>
          GiftedChat.append(prevMessages, newMessages),
        );
      });

      // Clean up the listener
      return () => unsubscribe();
    }
  }, [userId, otherUserId]);

  const onSend = useCallback(
    (newMessages = []) => {
      const db = getFirestore(firebaseApp);
      const chatId = generateChatId(userId, otherUserId);
      const messagesCollection = collection(db, `chats/${chatId}/messages`);
      //Ensure newMessages is always an array
      const messagesArray = Array.isArray(newMessages)
        ? newMessages
        : [newMessages];

      console.log('new messages array:', messagesArray);
      messagesArray.forEach(async message => {
        const {_id, text, createdAt, user} = message;
        //Debugging
        console.log('checking iD:', _id);
        try {
          await addDoc(messagesCollection, {
            _id,
            text,
            createdAt,
            user,
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      });
    },
    [userId, otherUserId],
  );

  //Function to check and request permissions
  const checkPermission = async () => {
    try {
      //Check if the recording permission is granted
      const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
      if (result === RESULTS.DENIED) {
        //Request permission if it's denied
        const requestResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        return requestResult === RESULTS.GRANTED;
      } else {
        return result === RESULTS.GRANTED;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  //Function to start recording
  const startRecording = useCallback(async () => {
    console.log('Start recording');
    //Check if it is already recording
    if (isRecording) return;

    //Check if app has necessary permissions
    const hasPermission = await checkPermission();

    if (!hasPermission) {
      console.log('Permission not granted');
      return;
    }

    //Reset audio URI before starting to record.
    setAudioURI(null);
    try {
      //Create a new recording instance
      const newRecording = new Audio.Recording();
      //Set the new recording instance to state
      setRecording(newRecording);
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      //  PREPARE FOR RECORDING
      await newRecording.startAsync();
      // START RECORDING
      setIsRecording(true);
      //Debugging
      console.log('Recording Started');
    } catch (error) {
      console.error(error);
    }
  }, [isRecording]);

  //Function to stop recording
  const stopRecording = useCallback(async () => {
    if (!isRecording) return;
    console.log('stop recording');
    try {
      if (recording && !isUnloaded) {
        await recording.stopAndUnloadAsync();
        setIsUnloaded(true);
        const uri = recording.getURI();
        setAudioURI(uri);
        setIsAudioReadyToSend(true);
        setIsRecording(false);
        console.log('Recording stopped. Audio path: ', uri);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isRecording, recording, isUnloaded]);

  //Function to send audio message to chat
  const sendAudioMessage = useCallback(
    async message => {
      if (!message) return;
      if (audioURI) {
        const audioMessage = {
          _id: Math.random().toString(),
          // text: '',
          createdAt: new Date(),
          user: {
            _id: 1,
            avatar: require('../../../assets/Profile.png'),
          },
          audio: audioURI,
        };
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [audioMessage]),
        );
        setIsAudioReadyToSend(false);
        //Reset the audioURI after sending
        setAudioURI(null);
        setIsRecording(false);
        setRecording(null);
        setIsUnloaded(false);
      }
    },
    [audioURI],
  );

  //Function to change the colour of text bubbles
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {color: colors.darkGray},
          right: {color: colors.grannySmithApple},
        }}
        wrapperStyle={{
          right: {backgroundColor: colors.grannySmithApple},
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackArrow onPress={() => navigation.navigate('Chats')} />
      </View>
      <GiftedChat
        messages={messages}
        // renderActions={renderActions}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={props => (
          <CustomChatInput
            {...props}
            onSendMessage={onSend}
            startRecording={startRecording}
            stopRecording={stopRecording}
            isAudioReadyToSend={isAudioReadyToSend}
            userId={userId}
          />
        )}
        renderMessageAudio={message => (
          <AudioMessagePlayer audioURL={message.currentMessage.audio} />
        )}
        style={styles.giftedChat}
        renderBubble={renderBubble}
      />
    </View>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  giftedChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    width: 100,
  },
});
export default SingleChatScreen;
