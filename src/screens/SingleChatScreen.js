import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import {Audio} from 'expo-av';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {v4 as uuidv4} from 'uuid';
// import * as firebase from 'firebase';
// import 'firebase/storage';

//local imports
import customInputToolbar from '../components/customInputToolbar';

//local imports
import AppText from '../components/AppText';
import CustomChatInput from '../components/CustomChatInput';
import AudioMessagePlayer from '../components/AudioMessagePlayer';
import {render} from '@testing-library/react-native';

function SingleChatScreen({navigation}) {
  //debugging
  console.log('SingleChatScreen is rendering');
  //Instantiate a new Recording
  const [recording, setRecording] = useState(null); // New state for recording
  const [isRecording, setIsRecording] = useState(false); //State to track if currently recording
  const [audioURI, setAudioURI] = useState(null); //save recording
  //State to track if audio message is ready to send
  const [isAudioReadyToSend, setIsAudioReadyToSend] = useState(false);
  const [isUnloaded, setIsUnloaded] = useState(false);

  //Set initial chat messages
  const initialMessages = [
    {
      _id: uuidv4(),
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: require('../../assets/Profile.png'),
      },
    },
  ];

  const [messages, setMessages] = useState([initialMessages]);

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

  //Function to handle sending messages
  //
  function onSend(newMessages = []) {
    //Debugging
    console.log(messages);
    // if (!messages.length || !messages[0]) return;

    // //Check for type of message to determine sending process
    // const messageType = messages[0].type;
    // if (messageType === 'text') {
    //   setMessages(previousMessages =>
    //     GiftedChat.append(previousMessages, messages),
    //   );
    // } else if (audioURI) {
    //   sendAudioMessage();
    // }

    if (audioURI) {
      console.log('current audio path', audioURI);
      sendAudioMessage();
    } else {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );
    }
  }

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
  const startRecording = async () => {
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
  };

  //Function to stop recording
  const stopRecording = async () => {
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
  };

  //Function to send audio message to chat
  const sendAudioMessage = () => {
    if (audioURI) {
      const audioMessage = {
        _id: Math.random().toString(),
        // text: '',
        createdAt: new Date(),
        user: {
          _id: 1,
          avatar: require('../../assets/Profile.png'),
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
  };

  //Function to render record, stopRecording and send buttons
  const renderActions = () => {
    return (
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={startRecording}>
          <MaterialCommunityIcons
            name="microphone"
            size={24}
            color={colors.lightGray}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={stopRecording}>
          <MaterialCommunityIcons
            name="stop"
            size={24}
            color={colors.lightGray}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Chats')}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.lightGray}
          />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        renderActions={renderActions}
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
          />
        )}
        renderMessageAudio={message => (
          <AudioMessagePlayer audioURL={message.currentMessage.audio} />
        )}
        style={styles.giftedChat}
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
