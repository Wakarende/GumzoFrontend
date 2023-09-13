import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Local imports
import colors from '../../config/colors';
import {generateChatId} from '../../utils/chatUtils';
import firebaseApp from '../../../firebaseConfig';
import {collection, addDoc, getFirestore} from '@firebase/firestore';
import {uploadAudioAndGetURL} from '../../utils/chatUtils';
import {uploadAudioToStorage} from '../../utils/audioUtils';

function CustomChatInput({
  onSendMessage,
  startRecording,
  stopRecording,
  isRecording,
  audioPath,
  isAudioReadyToSend,
  userId,
  otherUserId,
}) {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    try {
      if (message.trim() !== '' || isAudioReadyToSend) {
        if (!userId) {
          console.error('User ID is not defined');
          return;
        }

        // Check the value of audioPath when isAudioReadyToSend is true
        if (isAudioReadyToSend) {
          console.log('Audio path to be sent:', audioPath);
        }

        let newMessage = {
          _id: new Date().getTime().toString(),
          createdAt: new Date(),
          user: {_id: userId},
        };

        // Only add the text field if message is defined and non-empty
        if (message.trim()) {
          newMessage.text = message.trim();
        }

        // Check the value of audioPath when isAudioReadyToSend is true
        if (isAudioReadyToSend && audioPath) {
          const audioURL = await uploadAudioToStorage(audioPath);
          console.log('Audio path to be sent:', audioURL);
          newMessage.audio = audioURL;
        }

        // if (message.trim()) {
        //   newMessage.text = message;
        // } else if (isAudioReadyToSend && audioPath) {
        //   const audioURL = await uploadAudioAndGetURL(audioPath);
        //   console.log('Audio path to be sent:', audioURL);
        //   newMessage.audio = audioURL;
        // }

        // Ensure that either text or audio fields exist in the newMessage object before proceeding
        if (!newMessage.text && !newMessage.audio) {
          console.error('Both text and audio fields are undefined');
          return; // Exit the function as there's nothing to send
        }
        const db = getFirestore(firebaseApp);
        // Getting the chatId for the specific chat room between the two users
        const chatId = generateChatId(userId, otherUserId);
        const messagesCollection = collection(db, `chats/${chatId}/messages`);

        // Using Firestore's .add() to add the message so it generates a unique ID for each message
        await addDoc(messagesCollection, newMessage);

        onSendMessage(newMessage);
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending messages: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
        <MaterialCommunityIcons
          name="microphone"
          size={24}
          color={colors.lightGray}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={stopRecording}>
        <MaterialCommunityIcons
          name="stop"
          size={24}
          color={colors.lightGray}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Send a message..."
        autoFocus
      />
      <TouchableOpacity onPress={handleSend}>
        <MaterialCommunityIcons
          name="send"
          size={24}
          color={colors.lightGray}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgray',
    paddingBottom: 200,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
  },
  icon: {
    marginLeft: 10,
  },
});
export default CustomChatInput;
