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

//Instantiate a new Recording
const recording = new Audio.Recording();

function SingleChatScreen({navigation}) {
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
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);

    return () => {
      //stop and unload the recording when the component unmounts
      recording.stopAndUnloadAsync();
    };
  }, []);

  //Function to handle sending messages
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
    //Check if app has necessary permissions
    const hasPermission = await checkPermission();

    if (!hasPermission) {
      console.log('Permission not granted');
      return;
    }

    try {
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      ); // <----- PREPARE FOR RECORDING
      await recording.startAsync(); // <----- START RECORDING
    } catch (error) {
      console.error(error);
    }
  };

  //Function to stop recording
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync(); // <----- STOP RECORDING
    } catch (error) {
      console.error(error);
    }
  };

  //Function to render action buttons
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
        renderInputToolbar={props => customInputToolbar(props)}
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
