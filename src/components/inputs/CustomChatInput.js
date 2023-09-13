import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {generateChatId} from '../../utils/chatUtils';
import firebaseApp from '../../../firebaseConfig';
import {collection, addDoc, getFirestore} from '@firebase/firestore';

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
        }
        let newMessage = {
          _id: new Date().getTime().toString(),
          createdAt: new Date(),
          user: {_id: userId},
        };

        if (message.trim()) {
          newMessage.text = message;
        } else if (isAudioReadyToSend) {
          newMessage.audio = audioPath;
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
      {/*
      <TouchableOpacity
        onPress={() => {
          if (message.trim() !== '' || isAudioReadyToSend) {
            let newMessage = {
              _id: generateChatId(userId, otherUserId),
              createdAt: new Date(),
              user: {_id: userId},
            };

            if (message.trim()) {
              newMessage.text = message;
              console.log('Sending message:', newMessage);
            } else if (isAudioReadyToSend) {
              // assuming you'd have the URI or the path for the audio ready
              newMessage.audio = audioPath;
            }

            onSendMessage(newMessage);
            setMessage('');
          }
        }}>
        <MaterialCommunityIcons
          name="send"
          size={24}
          color={colors.lightGray}
          style={styles.icon}
        />
      </TouchableOpacity>
      */}
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
