import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {InputToolbar, Composer, Send} from 'react-native-gifted-chat';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';

function customInputToolbar({
  onSendAudio,
  isAudioReadyToSend,
  audioURI,
  ...props
}) {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderTopColor: colors.input,
        borderTopWidth: 1,
        marginTop: 10,
        padding: 5,
      }}>
      <Composer {...props} />
      {audioURI && (
        <TouchableOpacity onPress={onSendAudio}>
          <MaterialCommunityIcons
            name="microphone"
            size={24}
            color={colors.darkGray}
          />
        </TouchableOpacity>
      )}
      <Send {...props} alwaysShowSend>
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
