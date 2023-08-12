import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import {Audio} from 'expo-av';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
// import * as firebase from 'firebase';
// import 'firebase/storage';

//local imports
import customInputToolbar from '../components/customInputToolbar';

//local imports
import AppText from '../components/AppText';
import CustomChatInput from '../components/CustomChatInput';

function SingleChatScreen({navigation}) {
  //Instantiate a new Recording
  const [recording, setRecording] = useState(null); // New state for recording
  const [isRecording, setIsRecording] = useState(false); //State to track if currently recording
  const [audioURI, setAudioURI] = useState(null); //save recording
  //State to track if audio message is ready to send
  const [isAudioReadyToSend, setIsAudioReadyToSend] = useState(false);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //Set initial chat messages
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('../../assets/Profile.png'),
        },
      },
    ]);

    return () => {
      //stop and unload the recording when the component unmounts if it's currently recording
      if (isRecording && recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [isRecording, recording]); //Include dependencies

  //Function to handle sending messages
  //
  function onSend(messages = []) {
    if (audioURI) {
      sendAudioMessage();
    } else {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
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
    //Check if it is already recording
    if (isRecording) return;

    //Check if app has necessary permissions
    const hasPermission = await checkPermission();

    if (!hasPermission) {
      console.log('Permission not granted');
      return;
    }

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
    } catch (error) {
      console.error(error);
    }
  };

  //Function to stop recording
  const stopRecording = async () => {
    if (!isRecording) return;
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioURI(uri);
        setIsAudioReadyToSend(true);
        setIsRecording(false);
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
        text: '',
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
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderActions={renderActions}
        renderInputToolbar={props => (
          <CustomChatInput {...props} onSendMessage={onSend} />
        )}
        // renderInputToolbar={props =>
        //   customInputToolbar({
        //     ...props,
        //     onSendAudio: sendAudioMessage,
        //     audioURI,
        //     isAudioReadyToSend,
        //   })
        // }
      />
    </View>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
