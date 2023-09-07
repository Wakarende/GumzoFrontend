import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Local imports
import colors from '../config/colors';

const ChatActions = ({onStartRecording, onStopRecording}) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={onStartRecording}>
        <MaterialCommunityIcons
          name="microphone"
          size={24}
          color={colors.lightGray}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onStopRecording}>
        <MaterialCommunityIcons
          name="stop"
          size={24}
          color={colors.lightGray}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    width: 100,
  },
});

export default ChatActions;
