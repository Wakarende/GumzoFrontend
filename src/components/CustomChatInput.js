import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AppInput from './AppInput';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CustomChatInput({onSendMessage, startRecording, stopRecording}) {
  const [message, setMessage] = useState('');
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startRecording}>
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
      <TouchableOpacity
        onPress={() => {
          if (message.trim() !== '') {
            onSendMessage({
              text: message,
              createdAt: new Date(),
              user: {},
            });
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
    // borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
  },
});
export default CustomChatInput;
