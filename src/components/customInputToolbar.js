import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {InputToolbar, Composer, Send} from 'react-native-gifted-chat';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {View, StyleSheet} from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

function customInputToolbar(props) {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: colors.white,
        borderTopColor: colors.input,
        borderTopWidth: 1,
        marginTop: 10,
        padding: 5,
      }}>
      <Composer {...props} />
      <Send {...props}>
        <MaterialCommunityIcons name="send" size={24} color={colors.darkGray} />
      </Send>
    </InputToolbar>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
});

export default customInputToolbar;
