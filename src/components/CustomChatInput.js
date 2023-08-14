import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {v4 as uuidv4} from 'uuid';
function CustomChatInput({
  onSendMessage,
  startRecording,
  stopRecording,
  isRecording,
  audioPath,
  isAudioReadyToSend,
}) {
  const [message, setMessage] = useState('');
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
      {/* Display error message if validation failed for 'email' 
     <TouchableOpacity
        onPress={() => {
          if (message.trim() !== '' || isAudioReadyToSend) {
            onSendMessage({
              _id: uuidv4(),
              //specify type of message
              text: message.trim() ? message : undefined,
              createdAt: new Date(),
              user: {_id: 1},
            });
            
            setMessage('');
          }
        }}>*/}
      <TouchableOpacity
        onPress={() => {
          if (message.trim() !== '' || isAudioReadyToSend) {
            let newMessage = {
              _id: uuidv4(),
              createdAt: new Date(),
              user: {_id: 1},
            };

            if (message.trim()) {
              newMessage.text = message;
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // borderTopWidth: 1,
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
